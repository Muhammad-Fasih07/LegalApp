import React, { MouseEvent } from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  height?: string;
  width?: string;
  buttonColor?: string;
  textColor?: string;
  style?: React.CSSProperties;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;  // Update onClick type
}

const Button: React.FC<ButtonProps> = ({
  type,
  children,
  height,
  width,
  buttonColor,
  textColor,
  style,
  onClick,
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
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
