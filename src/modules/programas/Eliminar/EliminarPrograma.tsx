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
import { ResponsePrograma, Response } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import axios from 'axios';
import React from 'react';
import { LuTrash2, LuX } from 'react-icons/lu';
import { PiWarningBold } from 'react-icons/pi';
import { RiProhibitedLine } from 'react-icons/ri';

interface EliminarProgramaProps extends ModalProps {
  id: number;
  programa: ResponsePrograma;
}
export default function EliminarPrograma({ onClose, id, programa }: EliminarProgramaProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponsePrograma>();
  const { setMetadata } = useFilter();
  const { mutate } = useMutation<{ id: number }, Response<ResponsePrograma[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.delete(`${urlApi}/programa/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Programa eliminado correctamente',
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
        message: 'Error al eliminar paciente',
      });
    },
  });
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Deshabilitar Programa" badge="Acción Critica">
          <LuTrash2 size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <div className="flex flex-col gap-y-4 p-4">
        <span className="bg-ob-orange text-ob-black flex w-[536px] items-center gap-x-2.5 rounded-xl p-3 text-sm text-wrap">
          <span>
            <PiWarningBold size={18} />
          </span>
          <span className="font-semibold">
            Estás a punto de inhabilitar un Programa. El personal no podrá registrarla en citas.
            Esta acción es irreversible.
          </span>
        </span>
        <div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">{programa.nombre}</span>
            PPAP
          </div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">Descripcion</span>
            {programa.descripcion}
          </div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">Responsable</span>
            {programa.responsable
              ? `${programa.responsable.nombre} ${programa.responsable.apellidoPaterno} ${programa.responsable.apellidoMaterno}`
              : 'N/A'}
          </div>
        </div>
        <TextArea
          label="Motivo de Desactivación"
          placeholder="Agregue una nota para el equipo..."
          rows={4}
          className={{ label: 'text-ob-white text-sm' }}
        />
      </div>
      <ModalFooter nota="No se eliminará datos historicos">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button
            className="bg-ob-red-2 text-ob-white font-semibold"
            type="submit"
            onClick={() => {
              mutate({
                id,
              });
            }}
          >
            <RiProhibitedLine size={18} />
            Deshabilitar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
