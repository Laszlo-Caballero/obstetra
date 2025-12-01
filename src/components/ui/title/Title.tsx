import React, { ReactNode } from 'react';

interface TitleProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export default function Title({ title, description, icon }: TitleProps) {
  return (
    <div className="text-ob-black-4 dark:text-ob-white flex items-center font-medium">
      <div className="flex items-start gap-x-2.5">
        <span className="border-ob-red-4 dark:border-ob-teal bg-ob-white-4 dark:bg-ob-blue-2 rounded-xl border-3 p-1">
          {icon}
        </span>
        <div className="flex flex-col gap-y-0.5">
          <h2 className="text-xl">{title}</h2>
          <span className="text-ob-gray-2 text-sm">{description}</span>
        </div>
      </div>
    </div>
  );
}
