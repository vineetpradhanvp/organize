import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please enter task title"] },
    description: String,
    boardId: String,
    status: { type: Number, default: 0 },
    subTasks: Array,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

taskSchema.virtual("totalSubTasks").get(function () {
  return this.subTasks.length;
});
taskSchema.virtual("completedSubTasks").get(function () {
  return this.subTasks.filter((d) => d.status).length;
});

const Task = mongoose.model("task", taskSchema);
export default Task;
