"use client";

import { PropsWithChildren } from "react";
import { useModal } from "../Modal";
import cx from "@/libs/cx";
import Button from "../../button/Button";

interface CloseButtonProps extends PropsWithChildren {
  className?: string;
}

export default function CloseButton({ className, children }: CloseButtonProps) {
  const { onClose } = useModal();

  return (
    <Button
      className={cx(
        "border bg-transparent border-ob-gray text-white py-2.5 px-3 rounded-md cursor-pointer",
        className
      )}
      onClick={onClose}
    >
      {children}
    </Button>
  );
}
