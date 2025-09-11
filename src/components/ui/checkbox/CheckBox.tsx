"use client";

import cx from "@/libs/cx";
import React, { ReactNode, useState } from "react";

interface CheckBoxProps {
  children?: ReactNode;
  label?: string;
  className?: {
    container?: string;
    label?: string;
    checkbox?: string;
  };
}

export default function CheckBox({
  children,
  label,
  className,
}: CheckBoxProps) {
  const [isSelected, setSelected] = useState(false);
  return (
    <div className={cx("flex flex-col gap-y-1", className?.container)}>
      <span className={cx("text-ob-gray-2 font-medium", className?.label)}>
        {label}
      </span>
      <div
        className={cx(
          "rounded-full  p-2 cursor-pointer w-full  select-none ",
          isSelected
            ? "bg-ob-teal text-ob-black"
            : " bg-ob-blue-3 text-ob-lightblue",
          className?.checkbox
        )}
        onClick={() => setSelected(!isSelected)}
      >
        {children}
      </div>
    </div>
  );
}
