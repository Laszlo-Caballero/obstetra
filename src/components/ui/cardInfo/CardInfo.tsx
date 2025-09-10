import React, { ReactNode } from "react";

interface CardInfoProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export default function CardInfo({ title, description, icon }: CardInfoProps) {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2 p-3.5 rounded-xl bg-ob-blue-2">
        <div className="flex flex-col">
          <span className="text-sm text-ob-gray-2 font-semibold">{title}</span>
          <p className="text-xl text-ob-white">{description}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
