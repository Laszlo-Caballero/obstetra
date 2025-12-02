'use client';

import cx from '@/libs/cx';
import { ReactNode, useState } from 'react';
import 'react-day-picker/dist/style.css';
import { DayPicker } from 'react-day-picker';
import { useClose } from '@/hooks/useClose';

interface InputProps {
  label: string;
  id: string;
  icon?: ReactNode;
  error?: string;
  className?: {
    input?: string;
    label?: string;
    container?: string;
    main?: string;
  };
  value?: Date;
  onChange?: (date: Date) => void;
}

export default function InputDate({ label, icon, error, className, value, onChange }: InputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClose({
    closeFunction: () => setIsOpen(false),
  });

  return (
    <div className="relative" ref={ref}>
      <div
        className={cx('flex cursor-pointer flex-col gap-y-1', className?.main)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <label className={cx('text-ob-black-4 dark:text-ob-gray-2 font-medium', className?.label)}>
          {label}
        </label>
        <div
          className={cx(
            'dark:bg-ob-black-4 border-ob-white-3 dark:border-ob-gray flex h-[36px] items-center rounded-xl border bg-white',
            className?.container,
          )}
        >
          {icon && <span className="px-3">{icon}</span>}
          <p className="text-ob-black-4 px-4 dark:text-white">{value?.toLocaleDateString()}</p>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      {isOpen && (
        <div className="absolute top-full z-10 translate-y-4">
          <DayPicker
            mode="single"
            className="dark:bg-ob-black-4 border-ob-white-3 dark:border-ob-gray rounded-lg border bg-white p-2 shadow-lg"
            selected={value}
            defaultMonth={value}
            onSelect={(date) => {
              if (date) {
                onChange?.(date);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
