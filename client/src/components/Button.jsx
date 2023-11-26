import React from "react";
import styles from "../styles/button.module.scss";

export const Button = ({ label, onclick }) => {
  return (
    <div className={styles.button_section}>
      <button className={styles.button} onClick={onclick}>
        {label}
      </button>
    </div>
  );
};
