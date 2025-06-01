import { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: FC<InputProps> = ({ className, ...rest }) => {
  return (
    <input
      className={clsx("w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-indigo-200", className)}
      {...rest}
    />
  );
};

export default Input;
