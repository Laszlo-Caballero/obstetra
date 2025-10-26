import React, { ReactNode } from 'react';
import cx from '@/libs/cx';
import LinkNext, { LinkProps } from 'next/link';

interface CustomLinkProps extends Omit<LinkProps, 'className'> {
  className?: string;
  children?: ReactNode;
}

export default function Link({ className, children, ...props }: CustomLinkProps) {
  return (
    <LinkNext
      className={cx(
        'dark:bg-ob-blue dark:text-ob-black-6 bg-ob-red-6 flex cursor-pointer items-center gap-x-2 rounded-md px-3 py-2.5 text-sm font-medium text-white',
        className,
      )}
      {...props}
    >
      {children}
    </LinkNext>
  );
}
