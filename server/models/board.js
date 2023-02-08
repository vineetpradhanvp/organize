import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter board name"] },
});

const Board = mongoose.model("board", boardSchema);
export default Board;
