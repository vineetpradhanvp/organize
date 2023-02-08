import Board from "../models/board.js";
import Task from "../models/task.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getBoard = async (req, res) => {
  const { id } = req.params;
  try {
    const boards = await Board.findOne({ _id: id });
    res.status(200).json(boards);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const createBoard = async (req, res) => {
  const body = req.body;
  try {
    const board = await Board.create(body);
    res.status(200).json(board._id);
  } catch (e) {
    res.status(200).json(e);
  }
};

export const updateBoard = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const board = await Board.findOneAndUpdate({ _id: id }, body);
    res.status(200).json(board._id);
  } catch (e) {
    res.status(200).json(e);
  }
};

export const deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  try {
    await Task.deleteMany({ boardId });
    const board = await Board.findOneAndDelete({ _id: boardId });
    res.status(200).json(board._id);
  } catch (e) {
    res.status(200).json(e);
  }
};
