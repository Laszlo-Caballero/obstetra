import React from 'react';
import { LuShieldOff, LuX } from 'react-icons/lu';
import Button from '../../button/Button';

interface ToastFailedProps {
  title?: string;
  message?: string;
  onClose?: () => void;
  onRetry?: () => void;
  retry?: boolean;
}

export default function ToastFailed({ title, message, onClose, onRetry, retry }: ToastFailedProps) {
  return (
    <div className="bg-ob-red-2 flex h-[73px] w-[360px] items-center justify-around rounded-3xl px-3 py-2.5">
      <span className="text-ob-white flex items-center gap-x-2.5">
        <LuShieldOff size={26} />
        <span>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <p className="text-[13px]">{message}</p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        {retry && (
          <Button className="bg-ob-red-2 border-ob-red-3 text-ob-white border px-2 py-1.5">
            Reintentar
          </Button>
        )}
        <Button className="bg-ob-red-2 border-ob-red-3 border p-1.5" onClick={onClose}>
          <LuX size={18} className="text-ob-white" />
        </Button>
      </div>
    </div>
  );
}
