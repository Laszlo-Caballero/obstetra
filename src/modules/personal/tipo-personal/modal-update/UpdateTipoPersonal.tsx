'use client';

import { useAuth } from '@/components/context/AuthContext';
import { useTableContext } from '@/components/context/TableContext';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { env } from '@/config/env';
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { Response, ResponseTipoPersonal } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import {
  TipoPersonalInput,
  TipoPersonalSchema,
} from '@/schemas/personal/tipo-personal/tipoPersonal.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LuPersonStanding, LuSave, LuX } from 'react-icons/lu';

interface CreateTipoPersonalProps {
  onClose?: () => void;
  idTipoPersonal?: number;
}

export default function UpdateTipoPersonal({ onClose, idTipoPersonal }: CreateTipoPersonalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TipoPersonalSchema),
  });
  const { token } = useAuth();

  const { data } = useQuery<Response<ResponseTipoPersonal>>({
    queryFn: async (url) => {
      const res = await axios.get(`${url}/tipo-personal/${idTipoPersonal}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      setValue('nombre', data.data.nombre);
    }
  }, [data]);

  const { refresh } = useTableContext<ResponseTipoPersonal>();

  const { mutate } = useMutation<TipoPersonalInput, Response<ResponseTipoPersonal[]>>({
    mutationFn: async (data) => {
      const res = await axios.patch(`${env.url_api}/tipo-personal/${idTipoPersonal}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Tipo de Personal creado con éxito',
      });
      refresh(data.data);
      onClose?.();
    },
    onError: () => {
      notify.error({
        message: 'Error al crear Tipo de Personal',
      });
    },
  });

  return (
    <Modal
      onClose={onClose}
      className={{ container: 'dark:bg-ob-black-6 border-ob-white-3 dark:border-ob-gray bg-white' }}
    >
      <ModalHeader>
        <ModalTitle title="Actualizar Tipo Personal" badge="Actualizar">
          <LuPersonStanding size={20} className="text-ob-black-4 dark:text-ob-white" />
        </ModalTitle>
        <CloseButton>
          <LuX className="text-ob-black-4 dark:text-ob-white" size={20} />
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(mutate)}>
        <ModalContent>
          <Input
            label="Nombre"
            id="tipoPersonalName"
            {...register('nombre')}
            error={errors.nombre?.message}
          />
        </ModalContent>

        <ModalFooter>
          <ContainerButton>
            <CloseButton>Cancelar</CloseButton>
            <Button className="bg-ob-teal font-semibold text-white">
              <LuSave size={18} />
              Actualizar Tipo de Personal
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
