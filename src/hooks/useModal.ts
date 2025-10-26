import { useState } from 'react';

interface useModalInterface<T> {
  isOpen: boolean;
  id: T;
}

export function useModal<T>(defaultId: T) {
  const [open, setIsOpen] = useState<useModalInterface<T>>({
    isOpen: false,
    id: defaultId,
  });

  const openModal = (id: T) => {
    setIsOpen({ isOpen: true, id });
  };
  const closeModal = () => {
    setIsOpen({ isOpen: false, id: defaultId });
  };

  return {
    isOpen: open.isOpen,
    id: open.id,
    openModal,
    closeModal,
  };
}
