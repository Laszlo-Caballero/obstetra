'use client';
import { useAuth } from '@/components/context/AuthContext';
import { useTableContext } from '@/components/context/TableContext';
import Button from '@/components/ui/button/Button';
import InputIcon from '@/components/ui/input-icon/InputIcon';
import Input from '@/components/ui/input/input';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import Warning from '@/components/ui/warning/Warning';
import { useMutation } from '@/hooks/useMutation';
import { Response, ResponseBlogCategoria } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { CategoryInput, CategorySchema } from '@/schemas/cms/blog/Category.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LuSave, LuTags, LuX } from 'react-icons/lu';

interface ModalCreateCategoryProps {
  onClose?: () => void;
}

export default function ModalCreateCategory({ onClose }: ModalCreateCategoryProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CategorySchema),
  });
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponseBlogCategoria>();

  const { mutate } = useMutation<CategoryInput, Response<ResponseBlogCategoria[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.post(`${urlApi}/blog-category`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      const { data: categories } = data;
      refresh(categories);
      notify.success({ message: 'Categoría creada correctamente' });
      onClose?.();
    },
    onError: () => {
      notify.error({ message: 'Error al crear la categoría' });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Crear Categoría de Blog">
          <LuTags size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <form onSubmit={handleSubmit(mutate)}>
        <ModalContent>
          <Warning>
            Completa los 2 campos obligatorios para crear una nueva categoría de blog.
          </Warning>

          <Input
            label="Nombre"
            id="categoryName"
            placeholder="Ingrese el nombre de la categoría"
            {...register('name')}
            error={errors.name?.message}
          />

          <InputIcon
            value={watch('iconName')}
            label="Icono"
            placeholder="Selecciona un icono"
            onChange={(value) => setValue('iconName', value)}
          />
        </ModalContent>

        <ModalFooter>
          <ContainerButton>
            <CloseButton>Cancelar</CloseButton>
            <Button className="bg-ob-teal font-semibold text-white">
              <LuSave size={18} />
              Crear Categoría
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
