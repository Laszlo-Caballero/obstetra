'use client';

import cx from '@/libs/cx';
import React, { ReactNode, useState } from 'react';

interface CheckBoxProps {
  children?: ReactNode;
  label?: string;
  className?: {
    container?: string;
    label?: string;
    checkbox?: string;
  };
  onChange?: (value: boolean) => void;
  value?: boolean;
}

export default function CheckBox({ children, label, className, onChange, value }: CheckBoxProps) {
  const [isSelected, setSelected] = useState(value || false);
  return (
    <div className={cx('flex flex-col gap-y-1', className?.container)}>
      <span className={cx('text-ob-black-4 dark:text-ob-gray-2 font-medium', className?.label)}>
        {label}
      </span>
      <div
        className={cx(
          'w-full cursor-pointer rounded-full p-2 select-none',
          isSelected
            ? 'bg-ob-teal dark:text-ob-black text-white'
            : 'bg-ob-white-4 dark:bg-ob-blue-3 text-ob-black-4 dark:text-ob-lightblue',
          className?.checkbox,
        )}
        onClick={() => {
          setSelected(!isSelected);
          onChange?.(!isSelected);
        }}
      >
        {children}
      </div>
    </div>
  );
}
