import Todo from "../../models/TodoSchema";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  return await Todo.findByIdAndUpdate(id, body, { new: true });
});
