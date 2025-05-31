import { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

// const variantClasses = {
//   primary: "bg-indigo-600 text-white hover:bg-indigo-700",
//   secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
//   ghost: "bg-transparent text-indigo-600 hover:underline",
// };

// const sizeClasses = {
//   sm: "px-3 py-1 text-sm rounded-md",
//   md: "px-4 py-2 text-base rounded-md",
//   lg: "px-5 py-3 text-lg rounded-md",
// };

const Button: FC<ButtonProps> = ({ children, ...rest }) => (
  <button className={"btn btn-primary btn-md"} {...rest}>
    {children}
  </button>
);

export default Button;
