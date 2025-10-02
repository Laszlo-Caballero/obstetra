'use client';

import React, { ReactElement, ReactNode, useState } from 'react';
import Button from '../button/Button';
import cx from '@/libs/cx';
import { AnimatePresence } from 'motion/react';

interface ButtonModalProps {
  modal: ReactElement<{
    onClose: () => void;
  }>;
  children?: ReactNode;
  className?: string;
}

export default function ButtonModal({ modal, children, className }: ButtonModalProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button className={cx('text-ob-white', className)} onClick={() => setShowModal(true)}>
        {children}
      </Button>
      <AnimatePresence>
        {showModal && React.cloneElement(modal, { onClose: () => setShowModal(false) })}
      </AnimatePresence>
    </>
  );
}
