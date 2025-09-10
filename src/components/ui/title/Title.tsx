import React, { ReactNode } from "react";
import { LuArrowLeft, LuPill, LuSave } from "react-icons/lu";
import Button from "../button/Button";

interface TitleProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
}

export default function Title({ title, description, icon }: TitleProps) {
  return (
    <div className="flex items-center text-ob-white font-medium">
      <div className="flex items-start gap-x-2.5">
        <span className=" p-1 border-3 border-ob-teal rounded-xl bg-ob-blue-2">
          {icon}
        </span>
        <div className="flex flex-col gap-y-0.5">
          <h2 className="text-xl">{title}</h2>
          <span className="text-sm text-ob-gray-2">{description}</span>
        </div>
      </div>
    </div>
  );
}
