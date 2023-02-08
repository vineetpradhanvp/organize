import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoards,
  getBoard,
  updateBoard,
} from "../controllers/boardController.js";

const boardRouter = Router();

boardRouter.get("/", getBoards);
boardRouter.get("/:id", getBoard);
boardRouter.post("/", createBoard);
boardRouter.patch("/:id", updateBoard);
boardRouter.delete("/:boardId", deleteBoard);

export default boardRouter;
