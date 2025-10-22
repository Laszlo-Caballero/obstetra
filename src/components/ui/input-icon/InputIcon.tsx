'use client';
import cx from '@/libs/cx';
import { AnimatePresence } from 'motion/react';
import React, { ReactNode, RefObject, useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Modal from '../modal/Modal';
import * as Icons from 'react-icons/lu';
import ModalHeader from '../modal/modal-header/ModalHeader';
import ModalTitle from '../modal/modal-title/ModalTitle';
import CloseButton from '../modal/close-button/CloseButton';
import ModalContent from '../modal/modal-content/ModalContent';
import Search from '../search/Search';

interface InputIconProps {
  label?: string;
  className?: {
    label?: string;
    placeholder?: string;
  };
  placeholder?: string;
  iconInput?: ReactNode;
  value: string;
  ref?: RefObject<HTMLDivElement>;
  onChange?: (value: string) => void;
}

export default function InputIcon({
  label,
  className,
  placeholder,
  value,
  iconInput,
  ref,
  onChange,
}: InputIconProps) {
  const [showModal, setShowModal] = useState(false);
  const [findIcon, setFindIcon] = useState('');

  return (
    <div className="relative flex flex-col gap-y-1" ref={ref}>
      <label className={cx('text-ob-red-5 dark:text-ob-gray-2 font-medium', className?.label)}>
        {label}
      </label>
      <div
        className={cx(
          'dark:text-ob-white text-ob-black-4 dark:bg-ob-black-4 border-ob-white-3 dark:border-ob-gray flex cursor-pointer items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm font-medium',
          className?.placeholder,
        )}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="items-cente flex gap-x-2">
          {iconInput}
          <div className="text-nowrap">
            {(() => {
              const IconComp = value ? Icons[value as keyof typeof Icons] : undefined;
              return IconComp ? (
                <span className="flex items-center gap-x-1">
                  <IconComp className="size-4 text-white" />
                  {value}
                </span>
              ) : (
                placeholder
              );
            })()}
          </div>
        </div>
        <span>
          <RiArrowDropDownLine className="dark:text-ob-white text-ob-black-4" size={18} />
        </span>
      </div>

      <AnimatePresence>
        {showModal && (
          <Modal
            onClose={() => {
              setShowModal(false);
            }}
            className={{
              container: 'max-w-[1000px]',
            }}
          >
            <ModalHeader>
              <ModalTitle title="Seleccione un icono">
                <Icons.LuListChecks size={20} />
              </ModalTitle>
              <CloseButton>
                <Icons.LuX size={20} className="text-ob-white" />
              </CloseButton>
            </ModalHeader>
            <ModalContent>
              <Search
                placeholder="Buscar Icono"
                value={findIcon}
                onSearch={(value) => {
                  setFindIcon(value);
                }}
              />
              <div className="mt-4 grid max-h-[400px] grid-cols-6 gap-2 gap-x-2 overflow-y-auto">
                {Object.keys(Icons)
                  .filter((item) => item.toLocaleLowerCase().includes(findIcon.toLocaleLowerCase()))
                  .map((iconName) => {
                    const IconRender = Icons[iconName as keyof typeof Icons];

                    return (
                      <div
                        className={cx(
                          'border-ob-gray-4 hover:bg-ob-blue-4 flex flex-col rounded-xl border p-[11px] hover:cursor-pointer',
                          value === iconName && 'bg-ob-blue-4',
                        )}
                        key={iconName}
                        onClick={() => {
                          onChange?.(iconName);
                        }}
                      >
                        <div className="flex w-full items-center justify-center">
                          <IconRender size={22} className="text-ob-white" />
                        </div>
                        <span className="text-ob-gray-2 mt-1 text-center text-xs text-wrap break-words">
                          {iconName}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
