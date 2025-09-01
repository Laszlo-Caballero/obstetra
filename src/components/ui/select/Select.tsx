"use client";
import cx from "@/libs/cx";
import { ReactNode, useState } from "react";

type Options = {
  label: ReactNode;
  value: string;
};

interface SelectProps {
  label: string;
  placeholder?: string;
  options: Options[];
  className?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  className,
}: SelectProps) {
  const [isOpen] = useState(true);

  return <div className={cx(`bg-amber-200`, className)}>{label}</div>;
}
