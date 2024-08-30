import React from "react";
import styles from "../styles/buttoncomp.module.css";

const ButtonComp = ({ title, func }) => {
  return (
    <div class={styles.container}>
      <div class={styles.center}>
        <button className={styles.btn} onClick={func}>
          <svg
          className={styles.svg}
            width="180px"
            height="60px"
            viewBox="0 0 180 60"
          >
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className={styles.bg}
            />
            <polyline
              points="179,1 179,59 1,59 1,1 179,1"
              className={styles.h1}
            />
          </svg>
          <span>{title}</span>
        </button>
      </div>
    </div>
  );
};

export default ButtonComp;
