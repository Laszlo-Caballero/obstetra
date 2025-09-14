import React from 'react';
import { PiWarning } from 'react-icons/pi';
import Button from '../../button/Button';
import { LuX } from 'react-icons/lu';

interface ToastWarningProps {
  title?: string;
  message: string;
  onClose?: () => void;
  onDetails?: () => void;
  details?: boolean;
}

export default function ToastWarning({
  title,
  message,
  onClose,
  onDetails,
  details,
}: ToastWarningProps) {
  return (
    <div className="bg-ob-orange flex h-[73px] w-[360px] items-center justify-around rounded-3xl px-3 py-2.5">
      <span className="text-ob-black flex items-center gap-x-2.5">
        <PiWarning size={26} />
        <span>
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <p className="text-[13px]">{message}</p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        {details && (
          <Button
            className="bg-ob-orange border-ob-orange-2 text-ob-black border px-2 py-1.5"
            onClick={onDetails}
          >
            Detalles
          </Button>
        )}
        <Button className="bg-ob-orange border-ob-orange-2 border p-1.5" onClick={onClose}>
          <LuX size={18} className="text-ob-black" />
        </Button>
      </div>
    </div>
  );
}
