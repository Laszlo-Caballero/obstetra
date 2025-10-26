import { useAuth } from '@/components/context/AuthContext';
import { useFilter } from '@/components/context/FilterContext';
import { useTableContext } from '@/components/context/TableContext';
import Button from '@/components/ui/button/Button';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import Warning from '@/components/ui/warning/Warning';
import { useMutation } from '@/hooks/useMutation';
import { ModalProps } from '@/interface/moda.interface';
import { Response, ResponsePaciente } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import axios from 'axios';
import React from 'react';
import { LuTrash, LuUser, LuX } from 'react-icons/lu';

interface EliminarPacienteProps extends ModalProps {
  dni: string;
  paciente: ResponsePaciente;
}

export default function EliminarPaciente({ onClose, dni, paciente }: EliminarPacienteProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponsePaciente>();
  const { setMetadata } = useFilter();
  const { mutate } = useMutation<{ dni: string }, Response<ResponsePaciente[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.delete(`${urlApi}/pacientes/${data.dni}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({
        message: 'Paciente eliminado correctamente',
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
    <Modal
      onClose={onClose}
      className={{
        container: 'max-w-[500px]',
      }}
    >
      <ModalHeader>
        <ModalTitle title="Eliminar paciente" badge="Eliminar Estado">
          <LuUser size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Warning>
          ¿Estás seguro de que deseas eliminar al paciente {paciente.nombres}{' '}
          {paciente.apellido_paterno} {paciente.apellido_materno} con DNI {dni}? Esta acción no se
          puede deshacer.
        </Warning>
      </ModalContent>

      <ModalFooter>
        <ContainerButton>
          <CloseButton type="button">Cancelar</CloseButton>
          <Button
            type="submit"
            className="bg-red-500 font-semibold text-white"
            onClick={() => {
              mutate({
                dni,
              });
            }}
          >
            <LuTrash size={18} />
            Eliminar Paciente
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
