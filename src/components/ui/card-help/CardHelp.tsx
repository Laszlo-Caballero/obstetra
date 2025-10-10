import React, { ReactNode } from 'react';
import { LuInfo } from 'react-icons/lu';
import Badge from '../badge/Badge';

interface CardHelpProps {
  icon: ReactNode;
  question: string;
  iconBadge: ReactNode;
  badge: string;
  resumen: string;
}

export default function CardHelp({ icon, question, iconBadge, badge, resumen }: CardHelpProps) {
  return (
    <div className="border-ob-gray flex flex-col gap-y-2 rounded-xl border p-3">
      <div className="flex items-center justify-between">
        <span className="text-ob-white flex items-center gap-x-2.5">
          {icon}
          <p>{question}</p>
        </span>
        <Badge className="bg-ob-blue-3 flex items-center gap-x-2 px-3 text-sm">
          {iconBadge}
          {badge}
        </Badge>
      </div>
      <p className="text-ob-gray-2">{resumen}</p>
    </div>
  );
}
