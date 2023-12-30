import React, { FC } from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "fill" | "outline";
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "fill",
  type = "button",
  className,
  ...props
}) => {
  const styleInitialButton = {
    fill: "bg-sky-500 text-white border border-sky-500",
    outline: "bg-transparent text-blue-500 border border-sky-500",
  }[variant];

  return (
    <button
      type={type}
      className={clsx("px-6 py-2 rounded-sm", className, styleInitialButton)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
