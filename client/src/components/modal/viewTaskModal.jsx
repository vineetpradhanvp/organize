import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from "../../store/taskApi";
import { setUpdateTaskModal, setViewTaskModal } from "../../store/globalSlice";
import { AnimatePresence, motion } from "framer-motion";

import ModalWrapper from "./modalWrapper";
import MenuCard from "../menuCard";
import Dropdown from "../dropDown";

import styles from "../../styles/modal.module.css";

export default function ViewTaskModal() {
  const { viewTaskModal } = useSelector((state) => state.global);
  const [status, setStatus] = useState(0);
  const getTask = useGetTaskQuery(viewTaskModal, { skip: !viewTaskModal });
  const modalRef = useRef(null);
  const [updateTask] = useUpdateTaskMutation();
  const dispatch = useDispatch();
  const [taskMenu, setTaskMenu] = useState(0);
  const taskMenuRef = useRef(null);
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    const el = (e) => {
      if (!taskMenuRef.current.contains(e.target)) setTaskMenu(0);
    };
    document.body.addEventListener("click", el);
    return () => document.body.removeEventListener("click", el);
  }, []);

  useEffect(() => {
    getTask.isSuccess && setStatus(getTask.data?.status);
  }, [getTask.isSuccess]);

  const items = [
    {
      title: "Edit Task",
      clickHandler: (e) => {
        dispatch(setUpdateTaskModal(viewTaskModal));
        dispatch(setViewTaskModal(""));
        e.stopPropagation();
      },
    },
    {
      title: "Delete Task",
      clickHandler: () => {
        deleteTask(viewTaskModal);
        dispatch(setViewTaskModal(""));
      },
      danger: true,
    },
  ];

  return (
    <ModalWrapper
      setActive={(val) => dispatch(setViewTaskModal(val))}
      modalRef={modalRef}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className={styles.header}>
          <div className={styles.title}>{getTask.data?.title}</div>
          <div
            className={`material-icons-outlined ${styles.headerIconWrapper}`}
            ref={taskMenuRef}
          >
            <button
              className={`material-icons-outlined ${styles.headerIcon}`}
              onClick={() => setTaskMenu((prev) => !prev)}
            >
              more_vert
            </button>
            <AnimatePresence>
              {taskMenu ? <MenuCard items={items} /> : null}
            </AnimatePresence>
          </div>
        </div>
        <div className={styles.description}>{getTask.data?.description}</div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Status</label>
          <Dropdown
            items={["Todo", "Doing", "Done"]}
            clickHandler={(index) => {
              setStatus(index);
              updateTask({ id: viewTaskModal, status: index });
            }}
            activeItem={status}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>
            Subtasks ({getTask.data?.subTasks.filter((d) => d.status).length} of{" "}
            {getTask.data?.subTasks.length})
          </label>
          <div className={styles.subTasks}>
            {getTask.data?.subTasks.map((data, index) => (
              <button
                className={styles.subTask}
                key={index}
                onClick={() =>
                  updateTask({
                    id: getTask.data?._id,
                    subTasks: getTask.data?.subTasks.map((d, i) =>
                      i === index ? { ...d, status: !d.status } : d
                    ),
                  })
                }
              >
                <span
                  className={`${styles.checkbox} material-icons-outlined ${
                    data.status && styles.checkboxChecked
                  }`}
                ></span>
                <span
                  className={`${styles.subTaskTitle} ${
                    data.status && styles.subTaskTitleStriked
                  }`}
                >
                  {data.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </ModalWrapper>
  );
}
