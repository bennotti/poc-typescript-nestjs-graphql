import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: String,
  finished: Boolean,
  description: String,
});
