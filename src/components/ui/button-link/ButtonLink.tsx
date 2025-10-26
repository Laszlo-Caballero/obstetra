import cx from '@/libs/cx';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
}

export default function ButtonLink({ href, children, className }: ButtonLinkProps) {
  return (
    <Link
      className={cx(
        'flex cursor-pointer items-center gap-x-2 rounded-md px-3 py-2.5 text-sm font-medium',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
