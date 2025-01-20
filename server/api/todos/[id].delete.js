import Todo from '../../models/TodoSchema';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  return await Todo.findByIdAndDelete(id);
});
