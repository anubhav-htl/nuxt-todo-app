import Todo from '../../models/TodoSchema';

export default defineEventHandler(async () => {
  return await Todo.find();
});
