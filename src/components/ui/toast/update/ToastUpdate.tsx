import React from 'react';
import { LuInfo, LuX } from 'react-icons/lu';
import Button from '../../button/Button';

interface ToastUpdateProps {
  title?: string;
  message?: string;
  onClose?: () => void;
}

export default function ToastUpdate({ title, message, onClose }: ToastUpdateProps) {
  return (
    <div className="bg-ob-black-9 border-ob-gray flex h-[73px] w-[360px] items-center justify-between rounded-3xl px-3 py-2.5">
      <span className="text-ob-white flex items-center gap-x-2.5">
        <LuInfo size={18} />
        <span>
          {title && <h3 className="text-sm">{title}</h3>}
          <p className="text-ob-gray-2 text-[13px]">{message}</p>
        </span>
      </span>
      <Button className="bg-ob-black-9 border-ob-gray border p-1.5" onClick={onClose}>
        <LuX size={18} className="text-white" />
      </Button>
    </div>
  );
}
