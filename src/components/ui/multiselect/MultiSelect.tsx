'use client';
import { useClose } from '@/hooks/useClose';
import { Options } from '@/interface/props';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { LuSearch } from 'react-icons/lu';
import { RiArrowDropDownLine } from 'react-icons/ri';

interface MultiSelectProps {
  label?: string;
  options?: Options[];
  placeholder?: string;
  className?: string;
  // onSearch?: (value: string) => void;
  value?: Options[];
  onChange?: (selected: Options[]) => void;
  error?: string;
  disableSearch?: boolean;
  disable?: boolean;
}

export default function MultiSelect({
  label,
  placeholder,
  options,
  onChange,
  // onSearch,
  error,
  disableSearch,
  disable,
  value,
}: MultiSelectProps) {
  const [isOpen, setOpen] = useState(false);
  const ref = useClose({ closeFunction: setOpen });
  const [selectedOptions, setSelectedOptions] = useState<Options[]>(value || []);

  const setOption = (option: Options) => {
    let updatedOptions: Options[];

    if (selectedOptions.some((o) => o.value === option.value)) {
      updatedOptions = selectedOptions.filter((item) => item.value !== option.value);
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    onChange?.(updatedOptions);
  };

  return (
    <div className="relative flex flex-col gap-y-1" ref={ref}>
      <label className="text-ob-gray-2 font-medium">{label} </label>
      <div
        className="text-ob-white bg-ob-black-4 border-ob-gray gap-y-| flex cursor-pointer flex-col rounded-xl border px-3 py-2 text-sm font-medium"
        onClick={() => {
          if (!disable) setOpen(!isOpen);
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-nowrap">{placeholder}</span>
          <RiArrowDropDownLine className="text-ob-white" size={18} />
        </div>
        {selectedOptions.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {selectedOptions.map((option) => (
              <span
                key={option.value}
                className="border-ob-gray flex items-center gap-x-2 rounded-md border px-2"
              >
                {option.label}{' '}
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOption(option);
                  }}
                >
                  <IoMdClose size={10} />
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-ob-black-6 border-ob-gray absolute top-full z-10 mt-1 w-full translate-y-2 rounded-3xl border p-3"
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', overflow: 'visible' }}
            exit={{ height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
          >
            {!disableSearch && (
              <div className="bg-ob-black-8 flex w-full items-center gap-x-2 rounded-xl px-[11px] py-2">
                <LuSearch className="text-ob-white size-[18px]" />
                <input
                  className="text-ob-white w-full bg-none text-sm outline-none placeholder:text-white"
                  placeholder={'Buscar...'}
                />
              </div>
            )}

            <div className="mt-3 max-h-[100px] overflow-y-auto">
              {options?.map((option, i) => {
                const checked = selectedOptions.some((o) => o.value === option.value);

                return (
                  <div
                    className="hover:bg-ob-black-4 flex cursor-pointer items-center gap-x-2 rounded-xl px-4 py-2.5"
                    key={i}
                    onClick={() => setOption(option)}
                  >
                    <input type="checkbox" checked={checked} readOnly />
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
