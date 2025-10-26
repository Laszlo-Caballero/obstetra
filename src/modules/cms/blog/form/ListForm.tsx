'use client';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import cx from '@/libs/cx';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { LuChevronDown, LuCopy, LuList, LuTrash } from 'react-icons/lu';

interface ListFormProps {
  onDuplicate?: () => void;
  onDelete?: () => void;
}

export default function ListForm({ onDuplicate, onDelete }: ListFormProps) {
  const [open, setOpen] = useState(true);
  return (
    <InfoContainer className="gap-y-0 p-0">
      <header className="flex items-center justify-between px-3 py-2.5">
        <span className="flex items-center gap-x-2">
          <LuList className="text-ob-white" size={20} />
          <h1>LIST</h1>
        </span>

        <div className="flex items-center gap-x-2">
          <Button
            type="button"
            className="border-ob-gray-4 border dark:bg-transparent dark:text-white"
            onClick={onDuplicate}
          >
            <LuCopy className="size-4" />
            Duplicar
          </Button>
          <Button
            type="button"
            className="border-ob-gray-4 border dark:bg-transparent dark:text-white"
            onClick={onDelete}
          >
            <LuTrash className="size-4" />
            Eliminar
          </Button>

          <button className="cursor-pointer p-2" type="button" onClick={() => setOpen(!open)}>
            <LuChevronDown className={cx('size-4', open && 'rotate-180')} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.section
            className="overflow-hidden p-3"
            initial={{ padding: 0, height: 0 }}
            animate={{ padding: '12px', height: 'auto' }}
            exit={{ padding: 0, height: 0 }}
          ></motion.section>
        )}
      </AnimatePresence>
    </InfoContainer>
  );
}
