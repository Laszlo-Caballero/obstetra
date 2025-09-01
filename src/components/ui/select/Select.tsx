"use client";
import { ReactNode, useState } from "react";

type Options = {
  label: ReactNode;
  value: string;
};

interface SelectProps {
  label: string;
  placeholder?: string;
  options: Options[];
}

export default function Select({ label, options, placeholder }: SelectProps) {
  const [] = useState("");

  return <div>{label}</div>;
}
