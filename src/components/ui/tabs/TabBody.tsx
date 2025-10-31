'use client';

import { Children, PropsWithChildren } from 'react';
import { useTabs } from './Tabs';
import { AnimatePresence, motion } from 'motion/react';

export default function TabBody({ children }: PropsWithChildren) {
  const { selectedTab } = useTabs();

  return (
    <div className="p-4">
      <AnimatePresence>
        {Children.map(children, (child, i) => {
          return selectedTab === i ? (
            <motion.div
              id={`tab-body-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={i}
            >
              {child}
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
    </div>
  );
}
