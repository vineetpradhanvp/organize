import React, { useEffect } from "react";
import { motion } from "framer-motion";

import styles from "../../styles/modal.module.css";

export default function ModalWrapper(props) {
  useEffect(() => {
    const el = (e) => {
      if (!props.modalRef.current?.contains(e.target)) {
        props.setActive(0);
      }
    };
    document.body.addEventListener("mousedown", el);
    return () => {
      document.body.removeEventListener("mousedown", el);
    };
  }, []);

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.children}
    </motion.div>
  );
}
