'use client';

import { PropsWithChildren } from 'react';
import { useTabs } from './Tabs';
import cx from '@/libs/cx';

interface TabButtonProps extends PropsWithChildren {
  tabIndex?: number;
}

export default function TabButton({ tabIndex, children }: TabButtonProps) {
  const { selectedTab, setSelectedTab } = useTabs();

  return (
    <button
      className={cx('mb-2', selectedTab === tabIndex && 'border-ob-lightblue-2 border-b')}
      onClick={() => {
        setSelectedTab(tabIndex ?? 0);
      }}
    >
      {children}
    </button>
  );
}
