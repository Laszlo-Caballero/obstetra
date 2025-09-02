import React, { ButtonHTMLAttributes, ReactNode } from "react";
import cx from "@/libs/cx";
import LinkNext, { LinkProps } from "next/link";

interface CustomLinkProps extends Omit<LinkProps, "className"> {
  className?: string;
  children?: ReactNode;
}

export default function Link({
  className,
  children,
  ...props
}: CustomLinkProps) {
  return (
    <LinkNext
      className={cx(
        "flex items-center cursor-pointer bg-ob-blue gap-x-2 px-3 py-2.5 rounded-md text-ob-black-6 text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
    </LinkNext>
  );
}
