'use client';
import { PropsWithChildren } from 'react';

export default function TabsHeader({ children }: PropsWithChildren) {
  return <header className="flex items-center px-3 py-2.5">{children}</header>;
}
