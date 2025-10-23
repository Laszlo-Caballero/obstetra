import cx from '@/libs/cx';
import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react';

interface BadgeProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  className?: string;
}

export default function Badge({ className, children, ...props }: PropsWithChildren<BadgeProps>) {
  return (
    <span className={cx('rounded-full px-2 py-1 font-medium text-white', className)} {...props}>
      {children}
    </span>
  );
}
