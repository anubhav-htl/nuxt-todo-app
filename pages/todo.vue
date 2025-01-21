<template>
    <div class="max-w-7xl w-screen bg-gray-100 p-3">
      <h1>Todos</h1>
      <form class="w-full" @submit.prevent="addTodo">
        <div
          class="w-full flex gap-4 mb-6 max-[320px]:flex-col border bg-slate-200 rounded-md border-black px-3 py-3"
        >
          <input
            v-model="newTodo.title"
            placeholder="Add a new todo"
            class="border p-2 flex-1 rounded-md"
          />
          <button
            type="submit"
            class="bg-pink-950 text-white px-8 py-2 rounded-md font-semibold uppercase"
            :disabled="loading"
          >
            {{ loading ? "Adding..." : "Add" }}
          </button>
        </div>
      </form>

      <div
        class="grid grid-cols-4 max-[320px]:grid-cols-1 max-[425px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        <div
          v-for="todo in todos"
          :key="todo._id"
          class="flex flex-col h-40 mb-2 border border-black justify-between p-2 rounded-md"
          :class="{
            'bg-green-100': todo.completed,
            'bg-slate-200': !todo.completed,
          }"
        >
          <div
            class="h-full max-h-24 overflow-y-auto p-2 rounded-md"
            :class="{
              'bg-green-200': todo.completed,
              'bg-slate-100': !todo.completed,
            }"
          >
            <span class="text-zinc-800">{{ todo.title }}</span>
          </div>
          <div class="flex items-center justify-between">
            <p
              :class="{
                'text-green-700': todo.completed,
                'text-red-700': !todo.completed,
              }"
              class="text-xl capitalize ml-3"
            >
              {{ todo.completed ? "Completed" : "Pending" }}
            </p>
            <div class="flex gap-3 w-full justify-end">
              <button
                @click="openEditModal(todo)"
                class="bg-pink-700 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
              <button
                @click="openDeleteModal(todo)"
                class="bg-pink-900 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <Modal v-if="isEditModalOpen" @close="closeEditModal">
      <template #header>Edit Todo</template>
      <template #body>
        <textarea
          v-model="editText"
          rows="4"
          class="block w-full p-2 border rounded-md"
        ></textarea>
        <div class="flex items-center justify-between mt-4">
          <label for="completed" class="text-gray-700 font-medium"
            >Completed:</label
          >
          <input
            type="checkbox"
            id="completed"
            v-model="editCompleted"
            class="w-6 h-6"
          />
        </div>
      </template>
      <template #footer>
        <button
          @click="closeEditModal"
          class="bg-gray-400 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          @click="saveEditedTodo"
          class="bg-blue-500 text-white px-4 py-2 rounded-md"
          :disabled="loading"
        >
          Save
        </button>
      </template>
    </Modal>

    <!-- Delete Confirmation Modal -->
    <Modal v-if="isDeleteModalOpen" @close="closeDeleteModal">
      <template #header>Confirm Delete</template>
      <template #body> Are you sure you want to delete this todo? </template>
      <template #footer>
        <button
          @click="closeDeleteModal"
          class="bg-gray-400 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
        <button
          @click="deleteTodoItem"
          class="bg-red-500 text-white px-4 py-2 rounded-md"
          :disabled="loading"
        >
          {{ loading ? "Deleting..." : "Delete" }}
        </button>
      </template>
    </Modal>

</template>

<script setup>
import { ref, onMounted } from "vue";
import Modal from "@/components/Modal.vue";
import { toast } from "vue3-toastify";

const todos = ref([]);
const newTodo = ref({ title: "" });
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editText = ref("");
const editCompleted = ref(false);
const currentTodo = ref(null);
const loading = ref(false);

const fetchTodos = async () => {
  try {
    const { success, data } = await $fetch("/api/todo");
    if (success) {
      todos.value = data;
      // toast.success("seccesfully fetched todos", { autoClose: 2000 });
    } else {
      toast.error("failed fetch todos", { autoClose: 2000 });
    }
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    toast.error("failed fetch todos", { autoClose: 2000 });
  }
};

const addTodo = async () => {
  if (!newTodo.value.title.trim()) {
    toast.warn("Title cannot be empty", { autoClose: 1000 });
    return;
  }

  loading.value = true;
  try {
    const { data, success } = await $fetch("/api/todo/create-todo", {
      method: "POST",
      body: newTodo.value,
    });
    if (success) {
      newTodo.value.title = "";
      toast.success("Todo added successfully", { autoClose: 1000 });
      fetchTodos();
    }
  } catch (error) {
    console.error("Error adding todo:", error.message);
    toast.error("Failed to add todo", { autoClose: 1000 });
  } finally {
    loading.value = false;
  }
};

const saveEditedTodo = async () => {
  if (!editText.value.trim()) {
    alert("Title cannot be empty");
    return;
  }

  try {
    const { success, data, error } = await $fetch(
      `/api/todo/update-todo/${currentTodo.value._id}`,
      {
        method: "PUT",
        body: {
          title: editText.value,
          completed: editCompleted.value,
        },
      }
    );
    if (success) {
      toast.success("Todo updated successfully", { autoClose: 1000 });
      closeEditModal();
      fetchTodos();
    } else {
      toast.error("error: ", error, { autoClose: 1000 });
    }
  } catch (error) {
    console.error("Error saving todo:", error.message);
    toast.error("Failed to save todo", { autoClose: 1000 });
  } finally {
  }
};

const deleteTodoItem = async () => {
  try {
    const { data, error, success } = await $fetch(
      `/api/todo/delete-todo/${currentTodo.value._id}`,
      {
        method: "DELETE",
      }
    );
    if (success) {
      toast.success("Todo deleted successfully", { autoClose: 1000 });
      closeDeleteModal();
      fetchTodos();
    } else {
      toast.error("error: ", error, { autoClose: 1000 });
    }
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    toast.error("Failed to delete todo", { autoClose: 1000 });
  } finally {
  }
};

const openEditModal = (todo) => {
  editText.value = todo.title;
  editCompleted.value = todo.completed;
  currentTodo.value = todo;
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  currentTodo.value = null;
};

const openDeleteModal = (todo) => {
  currentTodo.value = todo;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  currentTodo.value = null;
};

onMounted(fetchTodos);
</script>
