import cx from "@/libs/cx";
import React, { PropsWithChildren, ReactNode } from "react";

interface DashedInfoProps {
  className?: string;
  children?: ReactNode;
}

export default function DashedInfo({ children, className }: DashedInfoProps) {
  return (
    <div
      className={cx(
        "flex items-center justify-between border-b border-dashed border-ob-gray py-2",
        className
      )}
    >
      {children}
    </div>
  );
}
