'use client';
import React from 'react';
import Modal from '@/components/ui/modal/Modal';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { LuSave, LuTag, LuX } from 'react-icons/lu';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/Textarea';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Button from '@/components/ui/button/Button';
import TablaModulo from '../tabla-modulo/TablaModulo';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ModuloSchema, ModuloSchemaType } from '@/schemas/ayuda/modulo.schema';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { notify } from '@/libs/toast';

interface CrearModuloProps {
  onClose?: () => void;
}

export default function CrearModulo({ onClose }: CrearModuloProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ModuloSchema),
  });

  const { mutate: create } = useMutation<ModuloSchemaType>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/ayuda/modulo`, data);

      return res.data;
    },
    onSuccess: () => {
      notify.success({
        message: 'Modulo creado con éxito',
      });
      onClose?.();
    },
    onError: () => {
      notify.error({
        message: 'Error al crear el modulo',
      });
    },
  });

  const onSubmit = (data: ModuloSchemaType) => {
    create(data);
  };

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle title="Crear Modulo" badge="Basico">
            <HiOutlineSquares2X2 size={20} />
          </ModalTitle>
          <CloseButton type="button">
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </ModalHeader>
        <div className="flex flex-col gap-y-3 p-4">
          <span className="text-ob-gray-2 text-sm">
            Agrega un Módulo Basico. Solo necesitas dos datos
          </span>
          <div className="flex flex-col gap-y-1">
            <Input
              label="Nombre del Modulo"
              placeholder="Ingresar Nombre"
              id="name"
              className={{ label: 'text-ob-white text-sm' }}
              icon={<LuTag size={18} />}
              {...register('nombre')}
              error={errors.nombre?.message}
            />
            <span className="text-ob-gray-2 text-xs">Ejemplos: Citas, Laboratorio, Metas</span>
          </div>
          <div className="flex flex-col gap-y-1">
            <TextArea
              label="Descripcion"
              placeholder="Ingresar Descripcion..."
              id="description"
              rows={3}
              className={{ label: 'text-ob-white text-sm' }}
              {...register('descripcion')}
              error={errors.descripcion?.message}
            />
            <span className="text-ob-gray-2 text-xs">Describe el funcionamiento del modulo</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1.5 p-4">
          <span>Modulos Existentes</span>
          <TablaModulo />
        </div>
        <ModalFooter nota="Se le notificara a todos los administradores">
          <ContainerButton>
            <CloseButton type="button">Cancelar</CloseButton>
            <Button type="submit" className="bg-ob-teal font-semibold">
              <LuSave size={18} />
              Guardar
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
