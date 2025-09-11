import React, { InputHTMLAttributes, Ref } from "react";
import cx from "@/libs/cx";
import { ReactNode } from "react";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label: string;
  id: string;
  icon?: ReactNode;
  error?: string;
  className?: {
    input?: string;
    label?: string;
    container?: string;
    main?: string;
  };
  ref?: Ref<HTMLInputElement>;
}
export default function Input({
  label,
  className,
  id,
  icon,
  error,
  ...props
}: InputProps) {
  return (
    <div className={cx("flex flex-col gap-y-1", className?.main)}>
      <label
        className={cx("text-ob-gray-2 font-medium", className?.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={cx(
          "flex items-center bg-ob-black-4 rounded-xl border border-ob-gray",
          className?.container
        )}
      >
        {icon && <span className="pl-3">{icon}</span>}
        <input
          className={cx(
            " font-medium text-sm placeholder-ob-white py-2 px-3 w-full focus:outline-none ",
            className?.input
          )}
          id={id}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
