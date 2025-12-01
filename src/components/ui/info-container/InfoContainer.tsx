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
      className={cx(
        'border-ob-white-3 dark:border-ob-gray dark:bg-ob-black-6 flex flex-col gap-y-3 rounded-3xl border bg-white p-4',
        className,
      )}
      {...props}
      ref={props.ref}
    >
      {children}
    </div>
  );
}
