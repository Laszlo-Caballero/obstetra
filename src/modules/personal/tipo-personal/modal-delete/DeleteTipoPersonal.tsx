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
import { env } from '@/config/env';
import { useMutation } from '@/hooks/useMutation';
import { Response, ResponseTipoPersonal } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import axios from 'axios';
import { LuPersonStanding, LuX } from 'react-icons/lu';

interface CreateTipoPersonalProps {
  onClose?: () => void;
  idTipoPersonal: number;
}

export default function DeleteTipoPersonal({ onClose, idTipoPersonal }: CreateTipoPersonalProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponseTipoPersonal>();

  const { mutate } = useMutation<{ id: number }, Response<ResponseTipoPersonal[]>>({
    mutationFn: async (data) => {
      const res = await axios.delete(`${env.url_api}/tipo-personal/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: ({ data }) => {
      refresh(data);
      notify.success({
        message: 'Tipo de Personal eliminado correctamente',
      });
      onClose?.();
    },
    onError: () => {
      notify.error({
        message: 'Error al eliminar el Tipo de Personal',
      });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Eliminar Tipo Personal" badge="Eliminar">
          <LuPersonStanding size={20} className="text-ob-white" />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Warning>
          ¿Estás seguro de que deseas eliminar este tipo de personal? Esta acción no se puede
          deshacer.
        </Warning>
      </ModalContent>
      <ModalFooter>
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button
            className="bg-red-600 font-semibold text-white"
            onClick={() => {
              mutate({
                id: idTipoPersonal,
              });
            }}
          >
            Eliminar Tipo de Personal
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
