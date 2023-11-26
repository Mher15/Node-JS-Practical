import React from "react";
import styles from "../styles/input.module.scss";

export const Input = ({ type, onChange, value, placeholder, inputName }) => {
  const onChangeValue = (event) => onChange(event.target.value);

  return (
    <div className={styles.input_section}>
      <input
        value={value}
        placeholder={placeholder}
        onChange={onChangeValue}
        type={type}
        className={styles.input}
      />
    </div>
  );
};
