import React, { TextareaHTMLAttributes } from 'react';
import cx from '@/libs/cx';

interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label: string;
  id?: string;
  className?: {
    textarea?: string;
    label?: string;
    container?: string;
    main?: string;
  };
  error?: string;
}
export default function TextArea({ label, className, error, id, ...props }: TextAreaProps) {
  return (
    <div className={cx('flex flex-col gap-y-1', className?.main)}>
      <label className={cx('text-ob-gray-2 font-medium', className?.label)} htmlFor={id}>
        {label}
      </label>
      <div
        className={cx(
          'bg-ob-black-4 border-ob-gray flex items-center rounded-xl border',
          className?.container,
        )}
      >
        <textarea
          className={cx(
            'placeholder-ob-white w-full resize-none px-3 py-2 text-sm font-medium focus:outline-none',
            className?.textarea,
          )}
          id={id}
          {...props}
        />
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
}
