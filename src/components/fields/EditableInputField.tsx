import React, { useState, FC } from "react";
import { FaEdit } from "react-icons/fa";

interface EditableInputFieldProps {
  isEditing: boolean;
  toggleEdit: () => void;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  placeholder?: string;
}

const EditableInputField: FC<EditableInputFieldProps> = ({
  isEditing,
  toggleEdit,
  width = "100%",
  height = "20px",
  style = {},
  placeholderStyle = {},
  placeholder = "Enter your text here",
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const defaultStyle = { width, height, ...style };
  const defaultPlaceholderStyle = {
    color: "grey",
    cursor: "pointer",
    ...placeholderStyle,
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={toggleEdit}
          style={defaultStyle}
          placeholder={placeholder}
        />
      ) : (
        <div onClick={toggleEdit} style={defaultPlaceholderStyle}>
          {value || placeholder}
        </div>
      )}
    </div>
  );
};

export default EditableInputField;
