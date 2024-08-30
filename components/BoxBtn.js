import React from "react";
import styles from "../styles/boxstyle.module.css";

const BoxBtn = ({ innerText }) => {


  return (
    <div role="button" tabIndex="0"  className={styles.frame}>
      <div className={styles.lines}></div>
      <div className={styles.angles}></div>
      <div className={styles.textDiv}>
        <div className={styles.txt}>{innerText}</div>
      </div>
    </div>
  );
};

export default BoxBtn;
