'use client';
import { useFilter } from '@/components/context/FilterContext';
import { useTableContext } from '@/components/context/TableContext';
import Modal from '@/components/ui/modal/Modal';
import { useMutation } from '@/hooks/useMutation';
import { Categoria, Response } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { CategoriaSchema, CategoriaSchemaType } from '@/schemas/medicina/categoria.schema';
import axios from 'axios';
import { FilterCategoria } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { LuPill, LuX } from 'react-icons/lu';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import Input from '@/components/ui/input/input';
import { TbCategory } from 'react-icons/tb';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Button from '@/components/ui/button/Button';
import { PiFolderSimplePlus } from 'react-icons/pi';

interface ModalCreateCategoryProps {
  onClose?: () => void;
}

export default function ModalCreateCategory({ onClose }: ModalCreateCategoryProps) {
  const { refresh } = useTableContext<Categoria>();
  const { setMetadata } = useFilter<FilterCategoria>();

  const { mutate } = useMutation<CategoriaSchemaType, Response<Categoria[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/farmacia/categoria`, data);

      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Categoría creada correctamente',
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
      notify.error({ message: 'Error al crear categoría' });
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategoriaSchema),
  });

  const onSubmit = (data: CategoriaSchemaType) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle title="Crear Categoría" badge="nueva categoría">
            <LuPill size={20} />
          </ModalTitle>
          <CloseButton>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </ModalHeader>

        <div className="p-4">
          <Input
            label="Nombre de la categoría"
            id="category-name"
            placeholder="Nombre de la categoría"
            icon={<TbCategory size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('nombre')}
            error={errors.nombre?.message}
            subtitle="Este será el nombre visible para todos."
          />
        </div>
        <ModalFooter>
          <ContainerButton>
            <CloseButton type="button">Cancelar</CloseButton>
            <Button
              type="submit"
              className="bg-ob-teal font-semibold"
              //   onClick={() => {
              //     mutateCreate;
              //   }}
            >
              <PiFolderSimplePlus size={18} />
              Guardar Categoría
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
