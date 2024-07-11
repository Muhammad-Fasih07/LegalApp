import React, { FC } from "react";

interface EditableInputFieldProps {
  isEditing: boolean;
  toggleEdit: () => void;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  placeholderStyle?: React.CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const EditableInputField: FC<EditableInputFieldProps> = ({
  isEditing,
  toggleEdit,
  width = "100%",
  height = "20px",
  style = {},
  placeholderStyle = {},
  placeholder = "Enter your text here",
  value,
  onChange,
  name,
}) => {
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
          name={name}
          value={value}
          onChange={onChange}
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
