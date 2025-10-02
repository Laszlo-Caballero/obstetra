'use client';
import cx from '@/libs/cx';
import React, { useState } from 'react';

interface ToggleProps {
  items: string[];
  className?: {
    main?: string;
    item?: string;
    background?: string;
    text?: string;
  };
}

export default function Toggle({ items, className }: ToggleProps) {
  const [currentIndex, setIndex] = useState(0);

  return (
    <div
      className={cx(
        'flex w-fit items-center gap-x-2 rounded-xl p-1.5 font-medium',
        className?.main,
      )}
    >
      {items.map((item, index) => {
        return (
          <div
            className={cx('relative cursor-pointer rounded-md px-3 py-2', className?.item)}
            onClick={() => setIndex(index)}
            key={index}
          >
            {currentIndex === index && (
              <span
                className={cx(
                  'bg-ob-black-4 absolute top-0 left-0 h-full w-full rounded-md',
                  className?.background,
                )}
              />
            )}

            <span className={cx('relative z-10', className?.text)}>{item}</span>
          </div>
        );
      })}
    </div>
  );
}
