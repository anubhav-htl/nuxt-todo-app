import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

export default defineEventHandler(async (event) => {
  const route = event.node.req.url; // Get the URL path
  const method = event.node.req.method; // Get the HTTP method

  if (route === "/todo" && method === "GET") {
    return await getTodos();
  }

  if (route === "/todo/create-todo" && method === "POST") {
    console.log("step: 2 -> route");
    try {
      const body = await readBody(event);
      return await createTodo(body);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  if (route.startsWith("/todo/update-todo/") && method === "PUT") {
    const id = route.split("/").pop();
    const body = await readBody(event);
    return await updateTodo(id, body);
  }

  if (route.startsWith("/todo/delete-todo/") && method === "DELETE") {
    const id = route.split("/").pop();
    console.log("id: " + id);
    return await deleteTodo(id);
  }

  // Default response for unmatched routes
  return { error: "Todo route not found", statusCode: 404 };
});
