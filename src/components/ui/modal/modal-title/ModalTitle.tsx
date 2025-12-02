import React, { PropsWithChildren } from 'react';
import Badge from '../../badge/Badge';
import cx from '@/libs/cx';

interface ModalTitleProps extends PropsWithChildren {
  title: string;
  badge?: string;
  className?: {
    container?: string;
    title?: string;
    badge?: string;
  };
}

export default function ModalTitle({ title, badge, children, className }: ModalTitleProps) {
  return (
    <div className={cx('flex items-center gap-x-2', className?.container)}>
      {children}
      <span className={cx('text-ob-black-4 dark:text-ob-white text-lg', className?.title)}>
        {title}
      </span>
      {badge && (
        <Badge className={cx('bg-ob-blue-3 text-ob-lightblue text-xs', className?.badge)}>
          {badge}
        </Badge>
      )}
    </div>
  );
}
