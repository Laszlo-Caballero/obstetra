import { IconProps } from "@/interface/props";
import cx from "@/libs/cx";
import Link from "next/link";
import React, { cloneElement, Fragment, ReactElement, SVGProps } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface BreadcrumsProps {
  items: {
    title: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

export default function Breadcrums({ items }: BreadcrumsProps) {
  return (
    <div className="flex items-center gap-x-2">
      {items.map((item, i) => {
        return (
          <Fragment key={i}>
            <Link href={item.href} className="flex items-center gap-x-2">
              {item.icon &&
                cloneElement(item.icon as ReactElement<IconProps>, {
                  className: cx(
                    "text-ob-gray-2",
                    i == items.length - 1 && "text-ob-white"
                  ),
                  size: 16,
                })}

              <p
                className={cx(
                  "text-ob-gray-2 text-sm font-medium",
                  i == items.length - 1 && "text-ob-white"
                )}
              >
                {item.title}
              </p>
            </Link>

            {i < items.length - 1 && (
              <IoIosArrowForward className="text-ob-gray-2" size={16} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
