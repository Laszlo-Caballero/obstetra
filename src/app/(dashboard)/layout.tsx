import Aside from '@/components/layout/aside/Aside';
import Header from '@/components/layout/header/Header';
import React, { PropsWithChildren } from 'react';

export default function LayoutDashboard({ children }: PropsWithChildren) {
  return (
    <main className="bg-ob-white-2 dark:bg-ob-black-11 text-ob-black-4 dark:text-ob-white flex h-screen w-full">
      <Aside />
      <div className="flex w-full flex-col overflow-y-auto">
        <Header />
        {children}
      </div>
    </main>
  );
}
