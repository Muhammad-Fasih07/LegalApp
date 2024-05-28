import React from "react";

interface InputFieldProps {
  name: string;
  value: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  type,
  onChange,
  style,
  label,
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
        style={style}
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
export default InputField;
