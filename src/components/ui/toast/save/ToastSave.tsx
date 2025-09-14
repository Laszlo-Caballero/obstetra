import React from 'react';
import { LuCircleCheckBig, LuX } from 'react-icons/lu';
import Button from '../../button/Button';

interface ToastSuccessProps {
  message?: string;
  onClose?: () => void;
  title?: string;
  onUndo?: () => void;
  undo?: boolean;
}

export default function ToastSuccess({ message, onClose, title, onUndo, undo }: ToastSuccessProps) {
  return (
    <div className="bg-ob-teal-3 flex h-[73px] w-[360px] items-center justify-around rounded-3xl px-3 py-2.5">
      <span className="text-ob-white flex items-center gap-x-2.5">
        <LuCircleCheckBig size={24} />
        <span>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <p className="text-[13px]">{message}</p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        {undo && (
          <Button
            className="bg-ob-teal-3 border-ob-teal-4 text-ob-white border px-2 py-1.5"
            onClick={onUndo}
          >
            Deshacer
          </Button>
        )}
        <Button className="bg-ob-teal-3 border-ob-teal-4 border p-1.5" onClick={onClose}>
          <LuX size={18} className="text-ob-white" />
        </Button>
      </div>
    </div>
  );
}
