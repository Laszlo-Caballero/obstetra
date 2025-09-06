"use client";
import cx from "@/libs/cx";
import { ReactNode, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useClose } from "@/hooks/useClose";
import { Options } from "@/interface/props";
import { LuSearch } from "react-icons/lu";
import { AnimatePresence, motion } from "motion/react";

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
  iconInput?: ReactNode;
  value?: Options;
  onChange?: (value: Options) => void;
  onSearch?: (value: string) => void;
  error?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  className,
  icon,
  iconInput,
  onChange,
  search,
  value,
  onSearch,
  error,
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
        <div className="flex items-cente gap-x-2">
          {iconInput}
          <div className="text-nowrap">
            {value ? value?.label : placeholder}
          </div>
        </div>
        <span>
          <RiArrowDropDownLine className="text-ob-white" size={18} />
        </span>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cx(
              "absolute translate-y-2 mt-1 top-full z-10 bg-ob-black-6 border border-ob-gray rounded-3xl p-3 w-full ",
              className?.optionsContainer
            )}
            initial={{ height: 0, overflow: "hidden" }}
            animate={{ height: "auto", overflow: "visible" }}
            exit={{ height: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-x-2 py-2 px-[11px] rounded-xl bg-ob-black-8 items-center w-full">
              <LuSearch className="text-ob-white size-[18px]" />
              <input
                value={search}
                onChange={(e) => onSearch?.(e.target.value)}
                className="bg-none outline-none w-full text-sm text-ob-white placeholder:text-white"
                placeholder={"Buscar..."}
              />
            </div>

            <div className="max-h-[100px] overflow-y-auto">
              {options?.map((option, i) => {
                return (
                  <div
                    className={cx(
                      "flex items-center gap-x-2 py-2.5 hover:bg-ob-black-4 rounded-xl cursor-pointer",
                      className?.optionsItem
                    )}
                    onClick={() => {
                      setOpen(false);
                      onChange?.(option);
                    }}
                    key={i}
                  >
                    <span>{icon}</span>
                    <p className="text-ob-white text-sm">{option.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
