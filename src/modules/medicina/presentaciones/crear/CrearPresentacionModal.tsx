'use client';
import { useFilter } from '@/components/context/FilterContext';
import { useMutation } from '@/hooks/useMutation';
import { Response, ResponsePresentacion } from '@/interface/response.interface';
import { PresentacionSchema, PresentacionSchemaType } from '@/schemas/medicina/presentacion.schema';
import axios from 'axios';
import React from 'react';
import { FilterPresentacion } from '../types';
import { useTableContext } from '@/components/context/TableContext';
import { notify } from '@/libs/toast';
import Modal from '@/components/ui/modal/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { LuPill, LuX } from 'react-icons/lu';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import Input from '@/components/ui/input/input';
import { IoGift } from 'react-icons/io5';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Button from '@/components/ui/button/Button';
import { PiFolderSimplePlus } from 'react-icons/pi';

interface Props {
  onClose?: () => void;
}

export default function CrearPresentacionModal({ onClose }: Props) {
  const { setMetadata } = useFilter<FilterPresentacion>();
  const { refresh } = useTableContext<ResponsePresentacion>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PresentacionSchema),
  });

  const { mutate } = useMutation<PresentacionSchemaType, Response<ResponsePresentacion[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/farmacia/presentacion`, data);

      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Presentación creada correctamente',
      });
      refresh(data.data);
      setMetadata({
        total: data?.metadata?.totalItems || 10,
        limit: 10,
        totalPage: data?.metadata?.totalPages || 1,
      });
      onClose?.();
    },
    onError: () => {
      notify.error({
        message: 'Error al crear la presentación',
      });
    },
  });

  const onSubmit = (data: PresentacionSchemaType) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle title="Crear Presentación" badge="nueva presentación">
            <LuPill size={20} />
          </ModalTitle>
          <CloseButton>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </ModalHeader>

        <div className="p-4">
          <Input
            label="Nombre de la presentación"
            id="presentacion"
            placeholder="Nombre de la presentación"
            icon={<IoGift size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('nombre')}
            error={errors.nombre?.message}
            subtitle="Este será el nombre visible para todos."
          />
        </div>
        <ModalFooter>
          <ContainerButton>
            <CloseButton type="button">Cancelar</CloseButton>
            <Button type="submit" className="bg-ob-teal font-semibold">
              <PiFolderSimplePlus size={18} />
              Guardar Presentación
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
