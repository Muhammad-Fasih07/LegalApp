import React from "react";
import styles from "../../Css/InputField.module.css"; // Import the CSS module

interface InputFieldProps {
  name: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  label?: string;
  labelColor?: string;
  enteredValueColor?: string;
  labelStyle?: React.CSSProperties;
  width?: string; // added width property
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  type,
  onChange,
  style,
  label,
  labelColor,
  enteredValueColor = "black",
  labelStyle,
  width, // added width
}) => {
  return (
    <div className={styles.inputField}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        placeholder={value ? " " : value}
        style={{
          ...style,
          color: enteredValueColor,
          width: width,
        }}
        required
      />
      {label && (
        <label htmlFor={name} style={{ color: labelColor, ...labelStyle }}>
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
