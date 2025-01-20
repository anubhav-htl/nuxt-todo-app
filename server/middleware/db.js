import connectDB from '../db';

export default defineEventHandler(() => {
  connectDB();
});
