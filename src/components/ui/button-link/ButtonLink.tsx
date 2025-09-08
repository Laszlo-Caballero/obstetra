import cx from "@/libs/cx";
import React, { ReactNode } from "react";

interface ButtonLinkProps {
  href?: string;
  children?: ReactNode;
  className?: string;
}

export default function ButtonLink({
  href,
  children,
  className,
}: ButtonLinkProps) {
  return (
    <a
      className={cx(
        "flex items-center cursor-pointer gap-x-2 px-3 py-2.5 rounded-md text-sm font-medium",
        className
      )}
      href={href}
    >
      {children}
    </a>
  );
}
