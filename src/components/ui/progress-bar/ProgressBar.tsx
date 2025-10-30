import React from 'react';
interface ProgressBarProps {
  porcentaje?: string;
}

export default function ProgressBar({ porcentaje }: ProgressBarProps) {
  return (
    <div className="flex h-[40px] w-[180px] flex-col gap-y-2">
      <span className="border-ob-gray block h-5 overflow-hidden rounded-xl border">
        <div className="bg-ob-blue h-full" style={{ width: porcentaje }} />
      </span>
      <span className="text-ob-gray-2 block text-right">{porcentaje}</span>
    </div>
  );
}
