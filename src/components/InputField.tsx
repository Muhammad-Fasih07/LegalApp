import React from "react";

interface InputFieldProps {
  name: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  label?: string;
  labelColor?: string;
  enteredValueColor?: string;
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
}) => {
  return (
    <div className="input-field">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        placeholder={value ? " " : value}
        style={{ ...style, color: enteredValueColor }}
        required
      />
      {label && (
        <label htmlFor={name} style={{ color: labelColor }}>
          {label}
        </label>
      )}
    </div>
  );
};

export default InputField;
