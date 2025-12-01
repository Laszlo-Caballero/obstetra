'use client';
import { AsideProps } from '@/interface/aside';
import cx from '@/libs/cx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cloneElement, isValidElement, ReactElement } from 'react';

interface AsideIconProps extends AsideProps {
  isOpen?: boolean;
  type?: 'item' | 'subItem';
}

export default function AsideIcon({
  icon,
  title,
  href,
  isOpen,
  description,
  subItems,
  type,
}: AsideIconProps) {
  const pathName = usePathname();

  const isActive = pathName === href;

  return (
    <div className="flex w-full flex-col">
      <Link
        href={href}
        className={cx(
          'flex w-full flex-col items-center justify-center gap-y-[6px] rounded-xl px-2 py-2.5',
          isActive && 'bg-ob-white-4 dark:bg-ob-gray-3',
          isOpen &&
            'hover:bg-ob-white-4 dark:hover:bg-ob-gray-3 flex-row justify-start gap-x-3 transition-all',
        )}
      >
        {isValidElement(icon) &&
          cloneElement(icon as ReactElement<HTMLSpanElement>, {
            className: cx(
              'size-[18px] text-ob-black-4 dark:text-ob-white',
              isOpen && 'size-[20px]',
              type === 'subItem' && 'size-[16px]',
            ),
          })}

        <div className={cx('flex flex-col', isOpen && 'gap-y-1')}>
          <p className="text-ob-black-4 dark:text-ob-white text-xs font-semibold">{title}</p>
          {isOpen && (
            <p className={cx('text-ob-gray-2 text-xs', type === 'subItem' && 'text-[10px]')}>
              {description}
            </p>
          )}
        </div>
      </Link>
      {subItems.length > 0 && isOpen && (
        <div className="border-ob-white-3 dark:border-ob-gray-4 mt-2 flex flex-col gap-y-1 border-t pt-2 pl-3">
          {subItems.map((subItem, index) => (
            <AsideIcon key={index} {...subItem} isOpen={isOpen} type="subItem" />
          ))}
        </div>
      )}
    </div>
  );
}
