import React, { TextareaHTMLAttributes } from "react";
import cx from "@/libs/cx";

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: string;
  id?: string;
  className?: {
    textarea?: string;
    label?: string;
    container?: string;
    main?: string;
  };
}
export default function TextArea({
  label,
  className,
  id,
  ...props
}: TextAreaProps) {
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
        <textarea
          className={cx(
            " font-medium text-sm placeholder-ob-white py-2 px-3 w-full focus:outline-none resize-none",
            className?.textarea
          )}
          id={id}
          {...props}
        />
      </div>
    </div>
  );
}
