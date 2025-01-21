import Todo from "../../models/TodoSchema";

// Get all todos
export const getTodos = async () => {
  try {
    const todos = await Todo.find();
    return { success: true, data: todos };
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    return { success: false, error: "Failed to fetch todos" };
  }
};

// Create a new todo
export const createTodo = async (data) => {
  try {
    if (!data.title) {
      return { success: false, error: "Title is required" };
    }

    const newTodo = new Todo({
      title: data.title,
      completed: data.completed || false,
    });

    const savedTodo = await newTodo.save();
    return { success: true, data: savedTodo };
  } catch (error) {
    console.error("Error creating todo:", error.message);
    return { success: false, error: "Failed to create todo" };
  }
};

// Update a todo
export const updateTodo = async (id, data) => {
  try {
    if (!id) {
      return { success: false, error: "ID is required for update" };
    }

    const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });

    if (!updatedTodo) {
      return { success: false, error: "Todo not found" };
    }

    return { success: true, data: updatedTodo };
  } catch (error) {
    console.error("Error updating todo:", error.message);
    return { success: false, error: "Failed to update todo" };
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    if (!id) {
      return { success: false, error: "ID is required for deletion" };
    }

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return { success: false, error: "Todo not found" };
    }

    return { success: true, data: deletedTodo };
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    return { success: false, error: "Failed to delete todo" };
  }
};
