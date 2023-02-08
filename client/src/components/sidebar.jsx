import React, { useEffect } from "react";
import { useGetBoardsQuery } from "../store/boardApi";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setNewBoardModal, setTheme } from "../store/globalSlice";
import { motion } from "framer-motion";

import SidebarIcon from "./svg/sidebarIcon";

import styles from "../styles/sidebar.module.css";

export default function Sidebar() {
  const getBoards = useGetBoardsQuery();
  const dispatch = useDispatch();
  const { activeTab, theme } = useSelector((state) => state.global);

  useEffect(() => {
    getBoards.isSuccess &&
      !getBoards.isFetching &&
      getBoards.data.length &&
      !activeTab &&
      dispatch(setActiveTab(getBoards.currentData[0]._id));
  }, [getBoards.isSuccess, getBoards.isFetching]);

  return (
    <motion.div
      className={styles.sidebar}
      initial={{ width: "0%" }}
      animate={{ width: "18.5rem" }}
      exit={{ width: "0%", transition: { duration: 0.2, damping: 100 } }}
    >
      <div className={styles.header}>ALL BOARDS ({getBoards.data?.length})</div>
      <div className={styles.tabs}>
        {getBoards.data?.map((board, index) => (
          <button
            className={`${styles.tab} ${
              activeTab === board._id ? styles.activeTab : null
            }`}
            onClick={() => dispatch(setActiveTab(board._id))}
            key={index}
          >
            <SidebarIcon />
            <span className={styles.tabTitle}>{board.name}</span>
          </button>
        ))}
      </div>
      <button
        className={styles.addTabBtn}
        onClick={(e) => {
          dispatch(setNewBoardModal(1));
          e.stopPropagation();
        }}
      >
        <SidebarIcon />
        <span className={styles.tabTitle}>Create New Board</span>
      </button>
      <div className={styles.theme}>
        <img src="/nightMode.svg" alt="" />
        <button
          className={`${styles.themeSlider} ${
            theme === "light" ? styles.themeSliderOn : styles.themeSliderOff
          }`}
          onClick={() =>
            dispatch(setTheme(theme === "dark" ? "light" : "dark"))
          }
        ></button>
        <img src="/lightMode.svg" alt="" />
      </div>
    </motion.div>
  );
}
