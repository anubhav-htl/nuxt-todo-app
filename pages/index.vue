<template>
  <div class="flex justify-center">
    <div class="max-w-7xl">
      <h1>Todos</h1>
      <form @submit.prevent="addTodo">
        <div
          class="flex gap-4 mb-6 max-[320px]:flex-col border bg-slate-200 rounded-md border-black px-3 py-3"
        >
          <input
            v-model="newTodo"
            placeholder="Add a new todo"
            class="border p-2 flex-1 rounded-md"
          />
          <button
            type="submit"
            class="bg-pink-950 text-white px-8 py-2 rounded-md font-semibold uppercase"
          >
            Add
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
            'bg-green-100': todo.completed === true,
            'bg-slate-200': todo.completed !== true,
          }"
        >
          <div
            class="h-full max-h-24 overflow-y-auto p-2 rounded-md"
            :class="{
              'bg-green-200': todo.completed === true,
              'bg-slate-100': todo.completed !== true,
            }"
          >
            <span class="text-zinc-800">{{ todo.text }}</span>
          </div>
          <div class="flex items-center justify-between">
            <p
              v-if="todo.completed"
              class="text-xl capitalize ml-3 text-green-700"
            >
              completed
            </p>
            <p v-else class="text-xl capitalize ml-3 text-red-700">Pending</p>
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
       <div
      v-if="isEditModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-xl font-bold mb-4">Edit Todo</h2>
        <input v-model="editText" class="border p-2 w-full mb-4" />
        <!-- Toggle for completed status -->
        <div class="flex items-center justify-between mb-4">
          <label for="completed" class="text-gray-700 font-medium"
            >Completed:</label
          >
          <input
            type="checkbox"
            id="completed"
            v-model="editCompleted"
            class="toggle-checkbox w-6 h-6 bg-gray-200 rounded border border-gray-400 focus:ring-blue-500"
          />
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="closeEditModal"
            class="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="saveEditedTodo"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="isDeleteModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-md w-96">
        <h2 class="text-xl font-bold mb-4">
          Are you sure you want to delete this todo?
        </h2>
        <div class="flex justify-end gap-3">
          <button
            @click="closeDeleteModal"
            class="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            @click="deleteTodoItem"
            class="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const todos = ref([]);
const newTodo = ref("");
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const editText = ref("");
const editCompleted = ref(false); // New state for the completed toggle
const currentTodo = ref(null);

const openEditModal = (todo) => {
  editText.value = todo.text;
  editCompleted.value = todo.completed; // Set completed state
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

// Fetch todos on page load
const { data, error, refresh } = await useFetch("/api/todos");
todos.value = data.value;

if (error.value) {
  console.error("Error fetching todos:", error.value);
}
// Add a new todo
const addTodo = async () => {
  await $fetch('/api/todos', {
    method: 'POST',
    body: { text: newTodo.value },
  });
  newTodo.value = '';
  await refresh(); // Re-fetch the todos
};

// Delete a todo
const deleteTodoItem = async (id) => {
  console.log(id);
  await $fetch(`/api/todos/${id}`, { method: "DELETE" });
  closeDeleteModal();
  refresh(); // Refresh the list
};
</script>
