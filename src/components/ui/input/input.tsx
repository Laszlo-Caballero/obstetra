import React, { InputHTMLAttributes } from "react";
import cx from "@/libs/cx";
import { ReactNode} from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  id: string;
  icon?: ReactNode;
  className?: {
    input?: string;
    label?: string;
    container?: string;
  };
  children?: ReactNode;
}
export default function Input({ label, className, id,icon, children, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-y-1">
      <label
        className={cx("text-ob-gray-2 font-medium", className?.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={cx("flex items-center bg-ob-black-4 rounded-xl border border-ob-gray",className?.container)}>
        {children}
        <input
          className={cx(
            " font-medium text-sm placeholder-ob-white py-2 px-3 w-full focus:outline-none ",
            className?.input
          )}
          id={id}
          {...props}
        />
      </div>
    </div>
  );
}
