import cx from "@/libs/cx";
import React, { PropsWithChildren } from "react";

interface ModalHeaderProps extends PropsWithChildren {
  className?: string;
}

export default function ModalHeader({ className, children }: ModalHeaderProps) {
  return (
    <header
      className={cx(
        "flex items-center justify-between p-4 font-medium border-b border-ob-gray",
        className
      )}
    >
      {children}
    </header>
  );
}
