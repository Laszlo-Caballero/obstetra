import cx from "@/libs/cx";
import React, { PropsWithChildren } from "react";

interface ContainerButtonProps extends PropsWithChildren {
  className?: string;
}

export default function ContainerButton({
  className,
  children,
}: ContainerButtonProps) {
  return (
    <div className={cx("flex items-center justify-between gap-x-3", className)}>
      {children}
    </div>
  );
}
