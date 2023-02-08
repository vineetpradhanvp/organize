import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setViewTaskModal } from "../store/globalSlice";
import { useGetTasksQuery } from "../store/taskApi";

import styles from "../styles/board.module.css";

export default function Board() {
  const { activeTab } = useSelector((state) => state.global);
  const getTasks = useGetTasksQuery(activeTab, { skip: !activeTab });
  const dispatch = useDispatch();
  const titleArr = ["T O D O ", "D O I N G", "D O N E"];
  const ballColorArr = ["#49c4e5", "#8471f2", "#67e2ae"];

  return (
    <div className={styles.board}>
      {[...Array(3)].map((_d, index) => (
        <div className={styles.column} key={index}>
          <div className={styles.title}>
            <span
              className={styles.titleBall}
              style={{ backgroundColor: ballColorArr[index] }}
            ></span>
            <span className={styles.titleText}>
              {titleArr[index]} ({" "}
              {getTasks.data?.filter((t) => t.status === index).length} )
            </span>
          </div>
          <div className={styles.cards}>
            {getTasks.data?.map((data, taskIndex) =>
              data.status === index ? (
                <div
                  className={styles.card}
                  key={taskIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setViewTaskModal(data._id));
                  }}
                >
                  <div className={styles.cardTitle}>{data.title}</div>
                  <div className={styles.cardFooter}>
                    {data.completedSubTasks} of {data.totalSubTasks} subtasks
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
