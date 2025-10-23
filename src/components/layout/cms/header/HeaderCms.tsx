import React, { PropsWithChildren } from 'react';

interface HeaderCmsProps extends PropsWithChildren {
  title: string;
}

export default function HeaderCms({ title, children }: HeaderCmsProps) {
  return (
    <header className="border-ob-gray-4 bg-ob-black-11 sticky top-0 z-50 flex items-center justify-between border-b px-4 py-2.5">
      <h1 className="text-lg font-semibold">{title}</h1>
      {children}
    </header>
  );
}
