import React, { HTMLAttributes, ReactNode } from 'react';
import cx from '@/libs/cx';

interface InfoContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export default function InfoContainer({ children, className, ...props }: InfoContainerProps) {
  return (
    <div
      className={cx('border-ob-gray flex flex-col gap-y-3 rounded-3xl border p-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}
