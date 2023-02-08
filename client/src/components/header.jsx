import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab,
  setNewTaskModal,
  setShowSidebar,
  setUpdateBoardModal,
} from "../store/globalSlice";
import { useDeleteBoardMutation, useGetBoardQuery } from "../store/boardApi";
import { AnimatePresence } from "framer-motion";

import MenuCard from "./menuCard";

import styles from "../styles/header.module.css";

export default function Header() {
  const dispatch = useDispatch();
  const [deleteBoard] = useDeleteBoardMutation();
  const [boardMenu, setBoardMenu] = useState(0);
  const { activeTab } = useSelector((state) => state.global);
  const getBoard = useGetBoardQuery(activeTab, { skip: !activeTab });
  const menuRef = useRef(null);

  useEffect(() => {
    const el = (e) => {
      if (!menuRef.current.contains(e.target)) setBoardMenu(0);
    };
    document.body.addEventListener("click", el);
    return () => document.body.removeEventListener("click", el);
  }, []);

  const items = [
    {
      title: "Edit Board",
      clickHandler: (e) => {
        e.stopPropagation();
        dispatch(setUpdateBoardModal(1));
        setBoardMenu(0);
      },
    },
    {
      title: "Delete Board",
      clickHandler: () => {
        deleteBoard(activeTab);
        dispatch(setActiveTab(""));
        setBoardMenu(0);
      },
      danger: true,
    },
  ];

  return (
    <>
      <div
        className={styles.headerLeft}
        onClick={() => dispatch(setShowSidebar())}
      >
        <img src="/logo.svg" alt="" className={styles.logo} />
        <span className={styles.appName}>organize</span>
      </div>
      <div className={styles.headerRight}>
        <span className={styles.title}>{getBoard.data?.name}</span>
        {activeTab ? (
          <button
            className={styles.addTaskBtn}
            onClick={(e) => {
              dispatch(setNewTaskModal(1));
              e.stopPropagation();
            }}
          >
            Add New Task
          </button>
        ) : null}

        <div className={styles.menu} ref={menuRef}>
          <button
            className={`material-icons-outlined ${styles.menuBtn}`}
            onClick={() => setBoardMenu((prev) => !prev)}
          >
            more_vert
          </button>
          <AnimatePresence>
            {boardMenu ? <MenuCard items={items} /> : null}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
