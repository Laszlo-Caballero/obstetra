import cx from '@/libs/cx';
import React, { PropsWithChildren } from 'react';

interface ModalHeaderProps extends PropsWithChildren {
  className?: string;
}

export default function ModalHeader({ className, children }: ModalHeaderProps) {
  return (
    <header
      className={cx(
        'border-ob-white-3 dark:border-ob-gray flex items-center justify-between border-b p-4 font-medium',
        className,
      )}
    >
      {children}
    </header>
  );
}
