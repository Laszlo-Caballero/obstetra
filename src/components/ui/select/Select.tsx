'use client';
import cx from '@/libs/cx';
import { ReactNode, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useClose } from '@/hooks/useClose';
import { Options } from '@/interface/props';
import { LuSearch } from 'react-icons/lu';
import { AnimatePresence, motion } from 'motion/react';

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
  disableSearch?: boolean;
  disable?: boolean;
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
  disableSearch,
  disable,
}: SelectProps) {
  const [isOpen, setOpen] = useState(false);
  const ref = useClose({ closeFunction: setOpen });

  return (
    <div className="relative flex flex-col gap-y-1" ref={ref}>
      <label className={cx('text-ob-red-5 dark:text-ob-gray-2 font-medium', className?.label)}>
        {label}
      </label>
      <div
        className={cx(
          'dark:text-ob-white text-ob-black-4 dark:bg-ob-black-4 border-ob-white-3 dark:border-ob-gray flex cursor-pointer items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm font-medium',
          className?.placeholder,
        )}
        onClick={() => {
          if (!disable) setOpen(!isOpen);
        }}
      >
        <div className="items-cente flex gap-x-2">
          {iconInput}
          <div className="text-nowrap">{value ? value?.label : placeholder}</div>
        </div>
        <span>
          <RiArrowDropDownLine className="dark:text-ob-white text-ob-black-4" size={18} />
        </span>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={cx(
              'dark:bg-ob-black-6 border-ob-white-3 dark:border-ob-gray absolute top-full z-10 mt-1 w-full translate-y-2 rounded-3xl border bg-white p-3',
              className?.optionsContainer,
            )}
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', overflow: 'visible' }}
            exit={{ height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.2 }}
          >
            {!disableSearch && (
              <div className="dark:bg-ob-black-8 border-ob-white-3 flex w-full items-center gap-x-2 rounded-xl border bg-white px-[11px] py-2 dark:border-none">
                <LuSearch className="dark:text-ob-white size-[18px]" />
                <input
                  value={search}
                  onChange={(e) => onSearch?.(e.target.value)}
                  className="dark:text-ob-white text-ob-red-5 placeholder:text-ob-red-5 w-full bg-none text-sm outline-none dark:placeholder:text-white"
                  placeholder={'Buscar...'}
                />
              </div>
            )}

            <div className="max-h-[100px] overflow-y-auto">
              {options?.map((option, i) => {
                return (
                  <div
                    className={cx(
                      'dark:hover:bg-ob-black-4 hover:bg-ob-white-3 dark:hover:text-ob-white hover:text-ob-red-5 dark:text-ob-white mt-1 flex cursor-pointer items-center gap-x-2 rounded-xl p-2.5',
                      className?.optionsItem,
                    )}
                    onClick={() => {
                      setOpen(false);
                      onChange?.(option);
                    }}
                    key={i}
                  >
                    <span>{icon}</span>
                    <p className="text-sm">{option.label}</p>
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
