"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { useModal } from "../Modal";
import cx from "@/libs/cx";
import Button from "../../button/Button";

interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children?: ReactNode;
  className?: string;
}

export default function CloseButton({
  className,
  children,
  ...props
}: CloseButtonProps) {
  const { onClose } = useModal();

  return (
    <Button
      className={cx(
        "border bg-transparent border-ob-gray text-white py-2.5 px-3 rounded-md cursor-pointer",
        className
      )}
      type="button"
      onClick={onClose}
      {...props}
    >
      {children}
    </Button>
  );
}
