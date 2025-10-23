'use client';
import React, { MouseEvent, PropsWithChildren } from 'react';
import ButtonModal from '../button-modal/ButtonModal';
import Modal from '../modal/Modal';
import ModalHeader from '../modal/modal-header/ModalHeader';
import ModalTitle from '../modal/modal-title/ModalTitle';
import { LuFile, LuX } from 'react-icons/lu';
import CloseButton from '../modal/close-button/CloseButton';
import { useQuery } from '@/hooks/useQuery';
import { Response, ResponseGaleria } from '@/interface/response.interface';
import { Recurso } from '@/interface/auth.interface';
import axios from 'axios';
import { env } from '@/config/env';
import { useAuth } from '@/components/context/AuthContext';
import ModalContent from '../modal/modal-content/ModalContent';
import Image from 'next/image';
import cx from '@/libs/cx';

interface ModalProps {
  onClose?: () => void;
  valueId?: number;
  onSelect?: (recurso: Recurso) => void;
}

interface ButtonGaleryProps extends PropsWithChildren {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void;
  onSelect?: (recurso: Recurso) => void;
  valueId?: number;
}

export default function ButtonGalery({
  children,
  type,
  className,
  onClick,
  valueId,
  onSelect,
}: ButtonGaleryProps) {
  return (
    <ButtonModal
      modal={<ModalGalery onSelect={onSelect} valueId={valueId} />}
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </ButtonModal>
  );
}

export function ModalGalery({ onClose, onSelect, valueId }: ModalProps) {
  const { token } = useAuth();

  const { data: resGalery } = useQuery<Response<Recurso[]>>({
    queryFn: async (url) => {
      const res = await axios.get(`${env.url_api}/recurso`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Galeria de imagenes" badge="Imagenes">
          <LuFile className="text-ob-white size-5" />
        </ModalTitle>
        <CloseButton>
          <LuX className="text-ob-white size-5" />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <div className="grid grid-cols-3 gap-4 p-4">
          {resGalery?.data.map((item) => (
            <Image
              src={env.api_images + item.url}
              alt={item.nombre}
              width={300}
              height={200}
              key={item.recursoId}
              className={cx(
                'h-auto w-full cursor-pointer rounded-lg object-cover hover:opacity-80',
                item.recursoId === valueId && 'ring-ob-blue ring-4',
              )}
              onClick={() => {
                onSelect?.(item);
              }}
            />
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
}
