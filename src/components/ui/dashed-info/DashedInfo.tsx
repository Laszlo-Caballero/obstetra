import cx from '@/libs/cx';
import React, { ReactNode } from 'react';

interface DashedInfoProps {
  className?: string;
  children?: ReactNode;
}

export default function DashedInfo({ children, className }: DashedInfoProps) {
  return (
    <div
      className={cx(
        'border-ob-gray flex items-center justify-between border-b border-dashed py-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
