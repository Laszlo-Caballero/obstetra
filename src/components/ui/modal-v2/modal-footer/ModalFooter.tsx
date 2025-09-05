import cx from "@/libs/cx";
import React, { PropsWithChildren } from "react";

interface ModalFooterProps extends PropsWithChildren {
  nota?: string;
  className?: {
    container?: string;
    nota?: string;
  };
}

export default function ModalFooter({
  children,
  className,
  nota,
}: ModalFooterProps) {
  return (
    <footer
      className={cx(
        "flex items-center justify-between p-4 font-medium border-t border-ob-gray",
        className?.container
      )}
    >
      <span className={cx("text-ob-gray-2 text-sm", className?.nota)}>
        {nota}
      </span>
      {children}
    </footer>
  );
}
