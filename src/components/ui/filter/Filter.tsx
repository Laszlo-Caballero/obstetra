"use client";
import { useClose } from "@/hooks/useClose";
import { IconProps, Options } from "@/interface/props";
import cx from "@/libs/cx";
import { cloneElement, ReactElement, ReactNode, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface FilterProps {
  placeholder?: string;
  values?: Options[];
  icon?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  className?: {
    container?: string;
    input?: string;
  };
}

export default function Filter({
  placeholder,
  values,
  value,
  onChange,
  icon,
  className,
}: FilterProps) {
  const [isOpen, setOpen] = useState(false);

  const ref = useClose({ closeFunction: setOpen });

  return (
    <div
      className={cx(
        "py-[11px] relative cursor-pointer flex items-center px-[13px] border gap-x-2 border-ob-gray rounded-xl",
        className?.container
      )}
      ref={ref}
      onClick={() => setOpen(!isOpen)}
    >
      {icon &&
        cloneElement(icon as ReactElement<IconProps>, {
          className: "size-[18px] text-white",
        })}

      <span className="text-ob-white font-medium text-sm">
        {placeholder} {values?.find((item) => item.value === value)?.label}
      </span>

      <MdOutlineKeyboardArrowUp
        className={cx(
          "size-[18px] text-white ml-auto",
          !isOpen && "rotate-180"
        )}
      />

      {isOpen && (
        <div className="absolute w-full z-10 max-h-[300px] overflow-y-auto bg-ob-black-7 left-0 top-full translate-y-2 rounded-lg border border-ob-gray">
          {values?.map((item) => (
            <div
              key={item.value}
              className="py-2.5 px-3 hover:bg-ob-gray-2 border-b border-ob-gray cursor-pointer text-sm bg-ob-black-7 first:rounded-t-lg last:border-0 last:rounded-b-lg text-ob-white font-medium"
              onClick={() => {
                onChange?.(item.value);
                setOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
