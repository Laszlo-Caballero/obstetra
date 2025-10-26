import React, { PropsWithChildren } from 'react';
import { LuCircleAlert } from 'react-icons/lu';

export default function Warning({ children }: PropsWithChildren) {
  return (
    <div className="border-ob-gray-4 text-ob-gray-2 flex w-full items-center gap-x-2 rounded-xl border px-[11px] py-[9px] font-bold text-wrap">
      <div>
        <LuCircleAlert size={16} />
      </div>
      {children}
    </div>
  );
}
