"use client";

import cx from "@/libs/cx";
import React, { ReactNode, useState } from "react";

interface CheckBoxProps {
  children?: ReactNode;
  labe?: string;
  className?: string;
}

export default function CheckBox({ children }: CheckBoxProps) {
  const [isSelected, setSelected] = useState(false);
  return (
    <div className="flex flex-col gap-y-">
      <div
        className={cx(
          "rounded-full border p-2 cursor-pointer",
          isSelected ? "bg-ob-teal" : "border-ob-gray"
        )}
        onClick={() => setSelected(!isSelected)}
      >
        {children}
      </div>
    </div>
  );
}
