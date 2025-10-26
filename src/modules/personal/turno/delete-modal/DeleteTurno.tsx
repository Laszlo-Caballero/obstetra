import { useAuth } from '@/components/context/AuthContext';
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
import { Response, ResponseTurno } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import axios from 'axios';
import { LuClock, LuX } from 'react-icons/lu';

interface DeleteTurnoProps extends ModalProps {
  turnoId: number;
}

export default function DeleteTurno({ onClose, turnoId }: DeleteTurnoProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponseTurno>();
  const { mutate } = useMutation<{ id: number }, Response<ResponseTurno[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.delete(`${urlApi}/turnos/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess(data) {
      notify.success({
        message: 'Turno eliminado exitosamente',
      });
      refresh(data.data);
      onClose?.();
    },
    onError() {
      notify.error({
        message: 'Error al eliminar el turno',
      });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Eliminar turno" badge="Eliminar">
          <LuClock size={18} className="text-ob-white" />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Warning>
          ¿Estás seguro de que deseas eliminar este turno? Esta acción no se puede deshacer.
        </Warning>
      </ModalContent>

      <ModalFooter>
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={() =>
              mutate({
                id: turnoId,
              })
            }
          >
            Eliminar Turno
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
