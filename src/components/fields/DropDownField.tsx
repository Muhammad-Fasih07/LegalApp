import React, { CSSProperties } from "react";
import "../../Css/DropDownField.css"; // Import the CSS file

interface SelectFieldProps<T> {
  // Add a generic parameter T
  options: T[]; // Use T[] instead of string[]
  onChange?: (value: T) => void; // Use T instead of string
  style?: CSSProperties;
}

const DropDownField: React.FC<SelectFieldProps<any>> = ({
  // Use any as the generic argument
  options,
  onChange,
  style,
}) => {
  return (
    <select
      className="select-field"
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
