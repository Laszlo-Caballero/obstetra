import { ReactNode } from 'react';
import cx from '@/libs/cx';

interface SmallCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: {
    container?: string;
    title?: string;
    description?: string;
  };
  children?: ReactNode;
}

export default function SmallCard({
  title,
  description,
  icon,
  className,
  children,
}: SmallCardProps) {
  return (
    <div
      className={cx(
        'text-ob-black-4 dark:text-ob-white border-ob-white-3 dark:border-ob-gray flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm',
        className?.container,
      )}
    >
      <div className="flex items-center gap-x-2.5">
        {icon}
        <div className="flex flex-col">
          <p className={cx('font-medium', className?.title)}>{title}</p>
          <span className={cx('text-ob-gray-2', className?.description)}>{description}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
