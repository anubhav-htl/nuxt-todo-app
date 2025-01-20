import Todo from '../../models/TodoSchema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const newTodo = new Todo({
    text: body.text,
    completed: body.completed || false,
  });
  return await newTodo.save();
});
