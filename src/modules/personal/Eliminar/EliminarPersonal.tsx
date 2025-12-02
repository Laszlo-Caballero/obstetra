import { useAuth } from '@/components/context/AuthContext';
import { useFilter } from '@/components/context/FilterContext';
import { useTableContext } from '@/components/context/TableContext';
import Button from '@/components/ui/button/Button';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import TextArea from '@/components/ui/textarea/Textarea';
import { useMutation } from '@/hooks/useMutation';
import { ModalProps } from '@/interface/moda.interface';
import { Response, ResponsePersonal } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { MotivoSchema, MotivoSchemaType } from '@/schemas/motivo/motivo.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LuTrash2, LuX } from 'react-icons/lu';
import { PiWarningBold } from 'react-icons/pi';
import { RiProhibitedLine } from 'react-icons/ri';

interface EliminarPersonalProps extends ModalProps {
  id: number;
  personal: ResponsePersonal;
}

export default function EliminarPersonal({ onClose, id, personal }: EliminarPersonalProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponsePersonal>();
  const { setMetadata } = useFilter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MotivoSchema),
  });

  const { mutate } = useMutation<
    { id: number; data: MotivoSchemaType },
    Response<ResponsePersonal[]>
  >({
    mutationFn: async (data, urlApi) => {
      const res = await axios.delete(`${urlApi}/personal/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data.data,
      });
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Personal eliminado correctamente',
      });
      refresh(data.data);
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        limit: 10,
        totalPage: data?.metadata?.totalPages || 0,
      });
      onClose?.();
    },
    onError: () => {
      notify.error({
        message: 'Error al eliminar personal',
      });
    },
  });

  const handleSubmitForm = (data: MotivoSchemaType) => {
    mutate({
      id,
      data,
    });
  };

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Deshabilitar Personal" badge="Acción Critica">
          <LuTrash2 size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-black-4 dark:text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className="flex flex-col gap-y-4 p-4">
          <span className="bg-ob-orange text-ob-black flex w-[536px] items-center gap-x-2.5 rounded-xl p-3 text-sm text-wrap">
            <span>
              <PiWarningBold size={18} />
            </span>
            <span className="font-semibold">
              Estás a punto de inhabilitar un Personal. Esta acción es irreversible.
            </span>
          </span>
          <div>
            <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
              <span className="text-ob-gray-2">Nombre</span>
              {`${personal.nombre} ${personal.apellidoPaterno} ${personal.apellidoMaterno}`}
            </div>
            <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
              <span className="text-ob-gray-2">Cargo</span>
              {personal.tipoPersonal?.nombre}
            </div>
            <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
              <span className="text-ob-gray-2">Correo</span>
              {personal.correo}
            </div>
          </div>
          <TextArea
            label="Motivo de Desactivación"
            placeholder="Agregue una nota para el equipo..."
            rows={4}
            className={{ label: 'text-ob-black-4 dark:text-ob-white text-sm' }}
            error={errors.razon?.message as string}
            {...register('razon')}
          />
        </div>
        <ModalFooter nota="No se eliminará datos historicos">
          <ContainerButton>
            <CloseButton>Cancelar</CloseButton>
            <Button className="bg-ob-red-2 text-ob-white font-semibold" type="submit">
              <RiProhibitedLine size={18} />
              Deshabilitar
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
