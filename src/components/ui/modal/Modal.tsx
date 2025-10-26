'use client';
import cx from '@/libs/cx';
import { motion } from 'motion/react';
import { createContext, PropsWithChildren, useContext } from 'react';

interface ModalProviderProps {
  onClose?: () => void;
}

const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

interface ModalProps extends PropsWithChildren {
  onClose?: () => void;
  className?: {
    background?: string;
    container?: string;
  };
}

export default function Modal({ onClose, className, children }: ModalProps) {
  return (
    <ModalContext value={{ onClose }}>
      <div
        className={cx(
          'fixed inset-0 z-[100] flex items-center justify-center bg-black/50',
          className?.background,
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        <motion.div
          className={cx(
            'bg-ob-black-6 border-ob-gray flex min-w-[560px] flex-col rounded-3xl border',
            className?.container,
          )}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </ModalContext>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
