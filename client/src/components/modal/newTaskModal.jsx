import React, { useRef, useState } from "react";
import { useCreateTaskMutation } from "../../store/taskApi";
import { useDispatch, useSelector } from "react-redux";
import { setNewTaskModal } from "../../store/globalSlice";
import { motion } from "framer-motion";

import ModalWrapper from "./modalWrapper";
import Dropdown from "../dropDown";

import styles from "../../styles/modal.module.css";

export default function UpdateTaskModal() {
  const modalRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createTask] = useCreateTaskMutation();
  const { activeTab } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [status, setStatus] = useState(0);
  const [subTasks, setSubTasks] = useState([""]);

  const createTaskHandler = () => {
    if (title) {
      createTask({
        boardId: activeTab,
        title,
        description,
        status,
        subTasks: subTasks
          .filter((d) => d)
          .map((d) => ({ title: d, status: false })),
      });
      dispatch(setNewTaskModal(0));
    } else {
      setError({ title: 1 });
    }
  };

  return (
    <ModalWrapper
      setActive={(val) => dispatch(setNewTaskModal(val))}
      modalRef={modalRef}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className={styles.title}>Add New Task</div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            id={styles.title}
            className={`${styles.input} ${
              error.title ? styles.inputError : null
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              error.title && setError((prev) => ({ ...prev, title: 0 }));
            }}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Description</label>
          <textarea
            type="text"
            id={styles.description}
            className={styles.input}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Subtasks</label>
          <div className={styles.subTasks}>
            {subTasks.map((data, index) => (
              <div className={styles.subTaskInput} key={index}>
                <input
                  type="text"
                  className={styles.input}
                  value={data}
                  onChange={(e) =>
                    setSubTasks(
                      subTasks.map((d, i) => (i === index ? e.target.value : d))
                    )
                  }
                />
                <button
                  className={`material-icons-outlined ${styles.removeSubTaskBtn}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSubTasks(subTasks.filter((_d, i) => i !== index));
                  }}
                >
                  close
                </button>
              </div>
            ))}
          </div>
          <button
            className={`${styles.addSubTaskBtn} ${styles.submitBtn}`}
            onClick={() => setSubTasks([...subTasks, ""])}
          >
            Add New Subtask
          </button>
        </div>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Status</label>
          <Dropdown
            items={["Todo", "Doing", "Done"]}
            clickHandler={(index) => setStatus(index)}
            activeItem={status}
          />
        </div>
        <button
          className={styles.submitBtn}
          onClick={() => createTaskHandler()}
        >
          Create New Task
        </button>
      </motion.div>
    </ModalWrapper>
  );
}
