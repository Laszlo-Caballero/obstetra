'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useModal } from '../Modal';
import cx from '@/libs/cx';
import Button from '../../button/Button';

interface CloseButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children?: ReactNode;
  className?: string;
}

export default function CloseButton({ className, children, ...props }: CloseButtonProps) {
  const { onClose } = useModal();

  return (
    <Button
      className={cx(
        'border-ob-white-3 dark:border-ob-gray text-ob-black-4 cursor-pointer rounded-md border bg-transparent px-3 py-2.5 dark:text-white',
        className,
      )}
      type="button"
      onClick={onClose}
      {...props}
    >
      {children}
    </Button>
  );
}
