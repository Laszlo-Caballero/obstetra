'use client';

import React, { MouseEvent, ReactElement, ReactNode, useState } from 'react';
import Button from '../button/Button';
import cx from '@/libs/cx';
import { AnimatePresence } from 'motion/react';

interface ButtonModalProps {
  modal: ReactElement<{
    onClose: () => void;
  }>;
  children?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
}

export default function ButtonModal({
  modal,
  children,
  className,
  type,
  onClick,
}: ButtonModalProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        className={cx('text-ob-white', className)}
        onClick={(e) => {
          setShowModal(true);
          onClick?.(e);
        }}
        type={type}
      >
        {children}
      </Button>
      <AnimatePresence>
        {showModal && React.cloneElement(modal, { onClose: () => setShowModal(false) })}
      </AnimatePresence>
    </>
  );
}
