import React, { InputHTMLAttributes, Ref } from 'react';
import cx from '@/libs/cx';
import { ReactNode } from 'react';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
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
  ref?: Ref<HTMLInputElement>;
  subtitle?: string;
}
export default function Input({
  label,
  className,
  id,
  icon,
  error,
  subtitle,
  ...props
}: InputProps) {
  return (
    <div className={cx('flex flex-col gap-y-1', className?.main)}>
      <label
        className={cx('dark:text-ob-gray-2 text-ob-red-5 font-medium', className?.label)}
        htmlFor={id}
      >
        {label}
      </label>
      <div
        className={cx(
          'dark:bg-ob-black-4 dark:border-ob-gray border-ob-white-3 flex items-center rounded-xl border bg-white',
          className?.container,
        )}
      >
        {icon && <span className="pl-3">{icon}</span>}
        <input
          className={cx(
            'dark:placeholder-ob-white placeholder-ob-black-4 w-full px-3 py-2 text-sm font-medium focus:outline-none',
            className?.input,
          )}
          id={id}
          {...props}
        />
      </div>
      {subtitle && <span className="text-ob-gray-2 mt-2 text-sm">{subtitle}</span>}
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
