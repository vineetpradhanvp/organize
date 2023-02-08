import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskControllers.js";

const taskRouter = Router();

taskRouter.get("/tasks/:boardId", getTasks);
taskRouter.get("/:taskId", getTask);
taskRouter.post("/", createTask);
taskRouter.patch("/:taskId", updateTask);
taskRouter.delete("/:taskId", deleteTask);

export default taskRouter;
