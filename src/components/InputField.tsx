import React from "react";
import "../Css/InputField.css";
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
}) => {
  return (
    <div className="input-field">
      {" "}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        placeholder={value ? " " : value}
        style={{
          width: "100%",
          ...style,
          color: enteredValueColor,
        }} /* Set width to 100% here */
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
