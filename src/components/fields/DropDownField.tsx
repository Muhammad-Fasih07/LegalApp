import React, { CSSProperties } from "react";
import "../../Css/DropDownField.css"; // Import the CSS file

interface SelectFieldProps {
  options: string[];
  onChange?: (value: string) => void;
  style?: CSSProperties;
}

const DropDownField: React.FC<SelectFieldProps> = ({
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
