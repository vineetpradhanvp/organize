import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Board from "./components/board";
import NewBoardModal from "./components/modal/newBoardModal";
import NewTaskModal from "./components/modal/newTaskModal";
import ViewTaskModal from "./components/modal/viewTaskModal";
import UpdateBoardModal from "./components/modal/updateBoardModal";
import UpdateTaskModal from "./components/modal/updateTaskModal";

import "./styles/index.css";

export default function App() {
  const {
    newBoardModal,
    newTaskModal,
    showSidebar,
    viewTaskModal,
    updateBoardModal,
    updateTaskModal,
    theme,
  } = useSelector((state) => state.global);
  return (
    <div className="root" id={`${theme === "dark" ? "dark" : "light"}`}>
      <header>
        <Header />
      </header>
      <main>
        <AnimatePresence>{showSidebar ? <Sidebar /> : null}</AnimatePresence>
        <Board />
      </main>
      <AnimatePresence>
        {newBoardModal ? <NewBoardModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {newTaskModal ? <NewTaskModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {updateBoardModal ? <UpdateBoardModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {updateTaskModal ? <UpdateTaskModal /> : null}
      </AnimatePresence>
      <AnimatePresence>
        {viewTaskModal ? <ViewTaskModal /> : null}
      </AnimatePresence>
    </div>
  );
}
