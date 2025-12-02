import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from '@/libs/cx';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  className?: string;
  children?: ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        'bg-ob-blue flex cursor-pointer items-center gap-x-2 rounded-md px-3 py-2.5 text-sm font-medium text-white',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
