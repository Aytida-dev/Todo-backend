import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  completed: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TodoModel = mongoose.model("Todo", TodoSchema);
export { TodoModel };
