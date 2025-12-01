import cx from '@/libs/cx';
import React, { ReactNode } from 'react';

interface CardInfoProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  className?: {
    main?: string;
    description?: string;
  };
}

export default function CardInfo({ title, description, icon, className }: CardInfoProps) {
  return (
    <div
      className={cx(
        'bg-ob-white-4 dark:bg-ob-blue-3 flex items-center justify-between gap-x-2 rounded-xl p-3.5',
        className?.main,
      )}
    >
      <div className="flex flex-col gap-y-1.5">
        <span className="text-ob-gray-2 text-sm font-semibold">{title}</span>
        <p className={cx('text-ob-black-4 dark:text-ob-white', className?.description)}>
          {description}
        </p>
      </div>
      {icon}
    </div>
  );
}
