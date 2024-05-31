import React from "react";

interface CheckboxProps {
  id: string;
  name: string;
  value: string;
  labelText: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  height?: string;
  labelStyle?: React.CSSProperties;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  value,
  labelText,
  checked,
  onChange,
  width = "auto",
  height = "auto",
  labelStyle,
}) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <label htmlFor={id} style={labelStyle}>
        {labelText}
      </label>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ marginLeft: "10px", width, height }}
      />
    </div>
  );
};

export default Checkbox;
