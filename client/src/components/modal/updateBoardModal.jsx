import React, { useRef, useState, useEffect } from "react";
import { useGetBoardQuery, useUpdateBoardMutation } from "../../store/boardApi";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateBoardModal } from "../../store/globalSlice";
import { motion } from "framer-motion";

import ModalWrapper from "./modalWrapper";

import styles from "../../styles/modal.module.css";

export default function UpdateBoardModal() {
  const [name, setName] = useState("");
  const modalRef = useRef(null);
  const { activeTab } = useSelector((state) => state.global);
  const [updateBoard] = useUpdateBoardMutation();
  const getBoard = useGetBoardQuery(activeTab, { skip: !activeTab });
  const dispatch = useDispatch();
  const [error, setError] = useState({});

  useEffect(() => {
    getBoard.isSuccess && setName(getBoard.data.name);
  }, [getBoard.isSuccess]);

  const editBoardHandler = () => {
    if (name) {
      updateBoard({ id: activeTab, name });
      dispatch(setUpdateBoardModal(0));
    } else {
      setError({ name: 1 });
    }
  };

  return (
    <ModalWrapper
      setActive={(val) => dispatch(setUpdateBoardModal(val))}
      modalRef={modalRef}
    >
      <motion.div
        className={styles.modal}
        ref={modalRef}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <div className={styles.title}>Edit Board</div>
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
        <button className={styles.submitBtn} onClick={() => editBoardHandler()}>
          Save Changes
        </button>
      </motion.div>
    </ModalWrapper>
  );
}
