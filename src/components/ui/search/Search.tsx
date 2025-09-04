"use client";
import cx from "@/libs/cx";
import { useId } from "react";
import { LuSearch } from "react-icons/lu";

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
  className?: {
    container?: string;
  };
}

export default function Search({
  placeholder,
  onSearch,
  className,
  value,
}: SearchProps) {
  const id = useId();

  return (
    <div
      className={cx(
        "w-full flex gap-x-2 border-ob-gray border rounded-lg h-10 py-[11px] px-[13px]",
        className?.container
      )}
    >
      <label htmlFor={id}>
        <LuSearch className="size-[18px] text-white" />
      </label>

      <input
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="h-full w-full outline-0"
        value={value}
      />
    </div>
  );
}
