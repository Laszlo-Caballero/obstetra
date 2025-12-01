'use client';
import { useClose } from '@/hooks/useClose';
import { IconProps, Options } from '@/interface/props';
import cx from '@/libs/cx';
import { cloneElement, ReactElement, ReactNode, useState } from 'react';
import { MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { AnimatePresence, motion } from 'motion/react';

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
        'border-ob-white-3 dark:border-ob-gray relative flex cursor-pointer items-center gap-x-2 rounded-xl border px-[13px] py-[11px]',
        className?.container,
      )}
      ref={ref}
      onClick={() => setOpen(!isOpen)}
    >
      {icon &&
        cloneElement(icon as ReactElement<IconProps>, {
          className: 'size-[18px] text-ob-black-4 dark:text-white',
        })}

      <span className="text-ob-black-4 dark:text-ob-white text-sm font-medium">
        {placeholder} {values?.find((item) => item.value === value)?.label}
      </span>

      <MdOutlineKeyboardArrowUp
        className={cx(
          'text-ob-black-4 ml-auto size-[18px] dark:text-white',
          !isOpen && 'rotate-180',
        )}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dark:bg-ob-black-7 border-ob-white-3 dark:border-ob-gray absolute top-full left-0 z-10 max-h-[300px] w-full translate-y-2 overflow-y-auto rounded-lg border bg-white"
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto', overflow: 'auto' }}
            exit={{ height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            {values?.map((item) => (
              <div
                key={item.value}
                className="hover:bg-ob-white-4 dark:hover:bg-ob-gray-2 border-ob-white-3 dark:border-ob-gray dark:bg-ob-black-7 text-ob-black-4 dark:text-ob-white cursor-pointer border-b bg-white px-3 py-2.5 text-sm font-medium first:rounded-t-lg last:rounded-b-lg last:border-0"
                onClick={() => {
                  onChange?.(item.value);
                  setOpen(false);
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
