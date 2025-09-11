"use client";

import cx from "@/libs/cx";
import { ReactNode, useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";

interface InputProps {
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
  value?: Date;
  onChange?: (date: Date) => void;
}

export default function InputDate({
  label,
  id,
  icon,
  error,
  className,
  value,
  onChange,
}: InputProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={cx("flex flex-col gap-y-1 relative", className?.main)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <label
        className={cx("text-ob-gray-2 font-medium", className?.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={cx(
          "flex items-center h-[36px] bg-ob-black-4 rounded-xl border border-ob-gray",
          className?.container
        )}
      >
        {icon && <span className="px-3">{icon}</span>}
        <p>{value?.toLocaleDateString()}</p>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}

      {isOpen && (
        <div className="absolute top-full translate-y-4 z-10">
          <DayPicker
            mode="single"
            className=" bg-ob-black-4 p-2 rounded-lg shadow-lg"
            selected={value}
            onSelect={(date) => {
              if (date) {
                onChange?.(date);
                setIsOpen(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
