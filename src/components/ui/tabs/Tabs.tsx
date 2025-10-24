'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface TabsContextProps {
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export default function Tabs({ children }: PropsWithChildren) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <TabsContext value={{ selectedTab, setSelectedTab }}>
      <div className="flex w-full flex-col">{children}</div>
    </TabsContext>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}
