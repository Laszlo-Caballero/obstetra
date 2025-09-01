import React, { InputHTMLAttributes } from "react";
import cx from "@/libs/cx";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  id: string;
  className?: {
    input?: string;
    label?: string;
    container?: string;
  };
}
export default function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className={cx("flex flex-col gap-y-1", className?.container)}>
      <label
        className={cx("text-ob-gray-2 font-medium", className?.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={cx(
          "bg-ob-black-4 rounded-xl font-medium text-sm placeholder-ob-white py-2 px-3 border border-ob-gray",
          className?.input
        )}
        id={id}
        {...props}
      />
    </div>
  );
}
