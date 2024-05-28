import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  height?: string;
  width?: string;
  buttonColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  height,
  width,
  buttonColor,
  textColor,
  style,
}) => {
  return (
    <button
      type={type}
      style={{
        height,
        width,
        backgroundColor: buttonColor,
        color: textColor,
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default Button;
