'use client';
import React, { cloneElement, isValidElement, ReactElement } from 'react';
import { motion } from 'motion/react';
import { BsGrid1X2 } from 'react-icons/bs';
import { asideData } from '@/const/cmsAsideData';
import Link from 'next/link';
import cx from '@/libs/cx';
import { usePathname } from 'next/navigation';
export default function AsideCms() {
  const pathName = usePathname();

  return (
    <motion.aside className="border-ob-gray-2 bg-ob-black-10 flex h-screen w-64 flex-col gap-4 border-r p-4">
      <header className="flex w-full items-center justify-center gap-x-[10px]">
        <span className="bg-ob-blue-3 border-ob-teal flex size-[32px] items-center justify-center rounded-xl border">
          <BsGrid1X2 />
        </span>

        <h1 className="text-lg font-semibold">CMS Landing</h1>
      </header>
      <main className="flex h-full flex-col gap-x-[6px] gap-y-4 overflow-y-auto">
        {asideData.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <p className="text-ob-gray-2 px-4 text-xs">{section.title}</p>
            <div className="flex flex-col gap-2">
              {section.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cx(
                    'hover:bg-ob-blue-4 flex items-center gap-2 rounded-xl px-4 py-2.5 hover:text-white',
                    pathName === item.href && 'bg-ob-blue-4 text-white',
                  )}
                >
                  {isValidElement(item.icon) &&
                    cloneElement(item.icon as ReactElement<HTMLSpanElement>, {
                      className: cx('size-[18px] text-ob-white'),
                    })}
                  <p className="text-sm">{item.title}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </motion.aside>
  );
}
