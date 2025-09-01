import React, { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "@/libs/cx";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  className?: string;
  children?: ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        "flex items-center bg-ob-blue gap-x-2 px-3 py-2.5 rounded-md text-ob-black-6 text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
