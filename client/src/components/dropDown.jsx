import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styles from "../styles/dropDown.module.css";

export default function Dropdown(props) {
  const menuRef = useRef(null);
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    const el = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsActive(0);
      }
    };
    document.body.addEventListener("click", el);
    return () => {
      document.body.removeEventListener("click", el);
    };
  }, []);

  const itemClickHandler = (e, index) => {
    e.stopPropagation();
    props.clickHandler(index);
    setIsActive(0);
  };

  return (
    <div className={styles.dropDown} ref={menuRef}>
      <button
        className={`${styles.input} ${isActive ? styles.activeInput : null}`}
        onClick={() => setIsActive((prev) => !prev)}
      >
        <span>{props.items[props.activeItem]}</span>
        <span className={`material-icons-outlined ${styles.arrowIcon}`}>
          expand_more
        </span>
      </button>
      <AnimatePresence>
        {isActive ? (
          <motion.div
            className={styles.menu}
            initial={{ height: "0%" }}
            animate={{ height: "auto" }}
            exit={{ height: "0%" }}
          >
            {props.items.map((item, index) =>
              index === props.activeItem ? null : (
                <button
                  className={styles.item}
                  onClick={(e) => itemClickHandler(e, index)}
                  key={index}
                >
                  {item}
                </button>
              )
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
