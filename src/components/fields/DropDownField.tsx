import React, { CSSProperties } from "react";
import "../../Css/DropDownField.css";

interface SelectFieldProps<T> {
  options: T[];
  value: T;
  onChange?: (value: T) => void;
  style?: CSSProperties;
}

const DropDownField: React.FC<SelectFieldProps<any>> = ({
  options,
  value,
  onChange,
  style,
}) => {
  return (
    <select
      className="select-field"
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      style={style}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default DropDownField;
