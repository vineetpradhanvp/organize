import React, { useEffect, useRef, useState } from "react";
import { useCreateBoardMutation } from "../../store/boardApi";
import { useDispatch } from "react-redux";
import { setActiveTab, setNewBoardModal } from "../../store/globalSlice";
import { motion } from "framer-motion";

import ModalWrapper from "./modalWrapper";

import styles from "../../styles/modal.module.css";

export default function NewBoardModal() {
  const [name, setName] = useState("");
  const modalRef = useRef(null);
  const [createBoard, createBoardStatus] = useCreateBoardMutation();
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  const addBoardHandler = () => {
    if (name) {
      createBoard({ name });
    } else {
      setError({ name: 1 });
    }
  };
  useEffect(() => {
    if (createBoardStatus.isSuccess) {
      dispatch(setActiveTab(createBoardStatus.data));
      dispatch(setNewBoardModal(0));
    }
  }, [createBoardStatus.isSuccess]);

  return (
    <ModalWrapper
      setActive={(val) => dispatch(setNewBoardModal(val))}
      modalRef={modalRef}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className={styles.title}>Add New Board</div>
        <div className={styles.inputWrapper}>
          <label htmlFor={styles.name} className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id={styles.name}
            className={`${styles.input} ${
              error.name ? styles.inputError : null
            }`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              error.name && setError((prev) => ({ ...prev, name: 0 }));
            }}
          />
        </div>
        <button className={styles.submitBtn} onClick={() => addBoardHandler()}>
          Create New Board
        </button>
      </motion.div>
    </ModalWrapper>
  );
}
