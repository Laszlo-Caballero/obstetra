import React, { HTMLAttributes, ReactNode, Ref } from 'react';
import cx from '@/libs/cx';

interface InfoContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function InfoContainer({ children, className, ...props }: InfoContainerProps) {
  return (
    <div
      className={cx('border-ob-gray flex flex-col gap-y-3 rounded-3xl border p-4', className)}
      {...props}
      ref={props.ref}
    >
      {children}
    </div>
  );
}
