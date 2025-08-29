"use client";
import { AsideProps } from "@/interface/aside";
import cx from "@/libs/cx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement, ReactElement } from "react";

export default function AsideIcon({ icon, title, href }: AsideProps) {
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={cx(
        "px-2 py-2.5 flex flex-col w-full rounded-xl items-center justify-center gap-y-[6px]",
        isActive && "bg-ob-gray-3"
      )}
    >
      {isValidElement(icon) &&
        cloneElement(icon as ReactElement<HTMLSpanElement>, {
          className: "size-[18px] text-ob-white",
        })}

      <p className="text-ob-white text-xs font-semibold">{title}</p>
    </Link>
  );
}
