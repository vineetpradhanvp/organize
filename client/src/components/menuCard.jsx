import React from "react";
import { motion } from "framer-motion";

import styles from "../styles/menucard.module.css";

export default function MenuCard(props) {
  return (
    <motion.div
      className={styles.menu}
      initial={{ height: "0%" }}
      animate={{ height: "auto" }}
      exit={{ height: "0%" }}
    >
      {props.items.map((item, index) => (
        <button
          className={`${styles.button} ${item.danger && styles.dangerBtn}`}
          onClick={item.clickHandler}
          key={index}
        >
          {item.title}
        </button>
      ))}
    </motion.div>
  );
}
