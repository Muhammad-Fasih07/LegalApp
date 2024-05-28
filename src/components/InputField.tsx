import React from "react";
import "../Screens/signUpLawyer.css";
interface InputFieldProps {
  name: string;
  value: string;
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  value,
  type,
  placeholder,
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
        placeholder={placeholder}
        style={style}
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default InputField;
