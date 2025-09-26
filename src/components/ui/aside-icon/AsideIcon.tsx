'use client';
import { AsideProps } from '@/interface/aside';
import cx from '@/libs/cx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, isValidElement, ReactElement } from 'react';

interface AsideIconProps extends AsideProps {
  isOpen?: boolean;
}

export default function AsideIcon({ icon, title, href, isOpen, description }: AsideIconProps) {
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <Link
      href={href}
      className={cx(
        'flex w-full flex-col items-center justify-center gap-y-[6px] rounded-xl px-2 py-2.5',
        isActive && 'bg-ob-gray-3',
        isOpen && 'hover:bg-ob-gray-3 flex-row justify-start gap-x-3 transition-all',
      )}
    >
      {isValidElement(icon) &&
        cloneElement(icon as ReactElement<HTMLSpanElement>, {
          className: cx('size-[18px] text-ob-white', isOpen && 'size-[20px]'),
        })}

      <div className={cx('flex flex-col', isOpen && 'gap-y-1')}>
        <p className="text-ob-white text-xs font-semibold">{title}</p>
        {isOpen && <p className="text-ob-gray-2 text-xs">{description}</p>}
      </div>
    </Link>
  );
}
