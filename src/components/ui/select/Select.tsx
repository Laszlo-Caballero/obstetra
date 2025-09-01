"use client";
import cx from "@/libs/cx";
import { ReactNode, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useClose } from "@/hooks/useClose";
import { Options } from "@/interface/props";

interface SelectProps {
  label?: string;
  placeholder?: string;
  search?: string;
  options?: Options[];
  className?: {
    label?: string;
    placeholder?: string;
    optionsContainer?: string;
    search?: string;
    optionsItem?: string;
  };
  icon?: ReactNode;
}

export default function Select({
  label,
  options,
  placeholder,
  search,
  className,
  icon,
}: SelectProps) {
  const [isOpen, setOpen] = useState(false);
  const ref = useClose({ closeFunction: setOpen });

  return (
    <div className="flex flex-col gap-y-1 relative" ref={ref}>
      <label className={cx("text-ob-gray-2 font-medium", className?.label)}>
        {label}
      </label>
      <div
        className={cx(
          "flex items-center justify-between text-ob-white bg-ob-black-4 rounded-xl font-medium text-sm py-2 px-3 border border-ob-gray cursor-pointer",
          className?.placeholder
        )}
        onClick={() => setOpen(!isOpen)}
      >
        <span>{placeholder}</span>
        <span>
          <RiArrowDropDownLine className="text-ob-white" size={18} />
        </span>
      </div>
      {isOpen && (
        <div
          className={cx(
            "absolute traslate-y-2 mt-1 top-full bg-ob-black-6 border border-ob-gray rounded-3xl p-3 w-full ",
            className?.optionsContainer
          )}
        >
          <div
            className={cx(
              "flex items-center gap-x-2 bg-ob-black-4 border border-ob-gray rounded-xl p-2 mb-2",
              className?.search
            )}
          >
            <span>
              <CiSearch className="text-ob-white" size={18} />
            </span>
            <input
              type="text"
              className="placeholder-ob-white text-sm w-full focus:outline-none"
              placeholder={search}
            />
          </div>
          <div className="max-h-[100px] overflow-y-scroll">
            {options?.map((option, i) => {
              return (
                <div
                  className={cx(
                    "flex items-center gap-x-2 p-3 hover:bg-ob-black-4 rounded-xl cursor-pointer",
                    className?.optionsItem
                  )}
                  onClick={() => setOpen(false)}
                  key={i}
                >
                  <span>{icon}</span>
                  <p className="text-ob-white text-sm">{option.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
