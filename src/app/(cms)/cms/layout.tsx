import AsideCms from '@/components/layout/cms/aside-cms/AsideCms';
import React, { PropsWithChildren } from 'react';

export default function LayoutCms({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full">
      <AsideCms />
      <div className="flex w-full flex-col overflow-y-auto">
        {/* <Header /> */}
        {children}
      </div>
    </main>
  );
}
