import cx from "@/libs/cx";
import React, { PropsWithChildren } from "react";

interface ModalContentProps extends PropsWithChildren {
  className?: string;
}

export default function ModalContent({
  className,
  children,
}: ModalContentProps) {
  return (
    <div className={cx("flex flex-col gap-y-3 p-4", className)}>{children}</div>
  );
}
