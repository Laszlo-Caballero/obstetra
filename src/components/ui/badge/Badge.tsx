import cx from "@/libs/cx";
import { PropsWithChildren } from "react";

interface BadgeProps {
  className?: string;
}

export default function Badge({
  className,
  children,
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cx("font-medium text-white rounded-full px-2 py-1", className)}
    >
      {children}
    </span>
  );
}
