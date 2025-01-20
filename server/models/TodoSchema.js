import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Todos || mongoose.model('Todos', TodoSchema);
