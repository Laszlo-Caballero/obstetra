'use client';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { useMutation } from '@/hooks/useMutation';
import { FolderSchema, FolderSchemaType } from '@/schemas/galeria/folder.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { IoWarningOutline } from 'react-icons/io5';
import { LuFolder, LuSave, LuX } from 'react-icons/lu';
import { useGalery } from '../context/GaleryContext';
import { Response, ResponseGaleria } from '@/interface/response.interface';
import { notify } from '@/libs/toast';

interface CrearCarpetaProps {
  onClose?: () => void;
}

export default function CrearCarpeta({ onClose }: CrearCarpetaProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(FolderSchema),
  });

  const pathName = usePathname();

  const parsePath = pathName?.replace('/galeria', '') || '';

  const { setData } = useGalery();

  const { mutate } = useMutation<FolderSchemaType, Response<ResponseGaleria>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/files/folder${parsePath}`, data);

      return res.data;
    },
    onSuccess: (data) => {
      notify.success({ message: 'Carpeta creada correctamente' });
      setData(data.data);
      onClose?.();
    },
    onError: () => {
      notify.error({ message: 'Error al crear la carpeta' });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Crear Carpeta">
          <LuFolder size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(mutate)}>
        <ModalContent>
          <Input
            label="Nombre de la Carpeta"
            id="folderName"
            placeholder="Carpeta"
            {...register('name')}
            error={errors.name?.message}
          />
          <span className="text-ob-gray-2 mt-0.5 flex items-center gap-x-1 text-xs">
            <IoWarningOutline />
            Usa guiones bajos o medios. Evita caracteres especiales.
          </span>

          <Input
            label="Ubicacion"
            id="location"
            value={parsePath.replaceAll('%20', ' ') || '/'}
            disabled
          />
        </ModalContent>

        <ModalFooter>
          <ContainerButton className="w-full">
            <CloseButton>Cancelar</CloseButton>
            <Button className="bg-ob-teal font-semibold text-white">
              <LuSave size={18} />
              Crear Carpeta
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
