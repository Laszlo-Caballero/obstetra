'use client';
import cx from '@/libs/cx';
import { ReactNode, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useClose } from '@/hooks/useClose';
import { Options } from '@/interface/props';
import { LuSearch } from 'react-icons/lu';
import { AnimatePresence, motion } from 'motion/react';

interface SelectProps<T = string> {
  label?: string;
  placeholder?: string;
  search?: string;
  options?: Options<T>[];
  className?: {
    label?: string;
    placeholder?: string;
    optionsContainer?: string;
    search?: string;
    optionsItem?: string;
  };
  icon?: ReactNode;
  iconInput?: ReactNode;
  value?: Options<T>;
  onChange?: (value: Options<T>) => void;
  onSearch?: (value: string) => void;
  error?: string;
  disableSearch?: boolean;
  disable?: boolean;
}

export default function Select<T = string>({
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
  disableSearch,
  disable,
}: SelectProps<T>) {
  const [isOpen, setOpen] = useState(false);
  const ref = useClose({ closeFunction: setOpen });

  return (
    <div className="relative flex flex-col gap-y-1" ref={ref}>
      <label className={cx('text-ob-gray-2 font-medium', className?.label)}>{label}</label>
      <div
        className={cx(
          'text-ob-white bg-ob-black-4 border-ob-gray flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm font-medium',
          className?.placeholder,
        )}
        onClick={() => {
          if (!disable) setOpen(!isOpen);
        }}
      >
        <div className="items-cente flex gap-x-2">
          {iconInput}
          <div className="text-nowrap">{value?.label ? value.label : placeholder}</div>
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
              'bg-ob-black-6 border-ob-gray absolute top-full z-10 mt-1 w-full translate-y-2 rounded-3xl border p-3',
              className?.optionsContainer,
            )}
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', overflow: 'visible' }}
            exit={{ height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
          >
            {!disableSearch && (
              <div className="bg-ob-black-8 flex w-full items-center gap-x-2 rounded-xl px-[11px] py-2">
                <LuSearch className="text-ob-white size-[18px]" />
                <input
                  value={search}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="text-ob-white w-full bg-none text-sm outline-none placeholder:text-white"
                  placeholder={'Buscar...'}
                />
              </div>
            )}

            <div className="max-h-[100px] overflow-y-auto">
              {options?.map((option, i) => {
                return (
                  <div
                    className={cx(
                      'hover:bg-ob-black-4 flex cursor-pointer items-center gap-x-2 rounded-xl py-2.5',
                      className?.optionsItem,
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
