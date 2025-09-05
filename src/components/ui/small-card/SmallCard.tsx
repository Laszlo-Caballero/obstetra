import { ReactNode } from "react";
import cx from "@/libs/cx";

interface SmallCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: {
    container?: string;
    title?: string;
    description?: string;
  };
  children?: ReactNode;
}

export default function SmallCard({
  title,
  description,
  icon,
  className,
  children,
}: SmallCardProps) {
  return (
    <div
      className={cx(
        "flex items-center justify-between py-2.5 px-3 text-sm text-ob-white border border-ob-gray rounded-xl",
        className?.container
      )}
    >
      <div className="flex items-center gap-x-2.5">
        {icon}
        <div className="flex flex-col">
          <p className={cx("font-medium", className?.title)}>{title}</p>
          <span className={cx("text-ob-gray-2", className?.description)}>
            {description}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}
