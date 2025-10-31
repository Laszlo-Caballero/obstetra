'use client';
import { Children, cloneElement, PropsWithChildren, ReactElement } from 'react';

export default function TabsHeader({ children }: PropsWithChildren) {
  return (
    <header className="flex items-center gap-x-2 px-3">
      {Children.map(children, (child, i) => {
        return cloneElement(child as ReactElement<{ tabIndex?: number }>, { tabIndex: i });
      })}
    </header>
  );
}
