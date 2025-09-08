import React, { ReactNode } from "react";
import cx from "@/libs/cx";

interface InfoContainerProps {
  children?: ReactNode;
  className?: string;
}

export default function InfoContainer({
  children,
  className,
}: InfoContainerProps) {
  return (
    <div
      className={cx(
        " flex flex-col gap-y-3 border border-ob-gray  rounded-3xl p-4",
        className
      )}
    >
      {children}
    </div>
  );
}
