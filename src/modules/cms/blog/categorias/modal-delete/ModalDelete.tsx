'use client';

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
import { Response, ResponseBlogCategoria } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import axios from 'axios';
import { LuDelete, LuX } from 'react-icons/lu';

interface ModalDeleteProps {
  onClose?: () => void;
  idCategory: string;
}

export default function ModalDelete({ onClose, idCategory }: ModalDeleteProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponseBlogCategoria>();

  const { mutate } = useMutation<{ id: string }, Response<ResponseBlogCategoria[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.delete(`${urlApi}/blog-category/${data.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
    onSuccess: (data) => {
      refresh(data.data);
      notify.success({ message: 'Categoría eliminada correctamente' });
      onClose?.();
    },
    onError: () => {
      notify.error({ message: 'Error al eliminar la categoría' });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Eliminar Categoría de Blog">
          <LuDelete size={20} className="text-ob-white" />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <ModalContent>
        <Warning>
          ¿Estás seguro que deseas eliminar esta categoría de blog? Esta acción no se puede
          deshacer.
        </Warning>
      </ModalContent>
      <ModalFooter>
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button
            className="bg-ob-teal font-semibold text-white"
            onClick={() => {
              mutate({
                id: idCategory,
              });
            }}
          >
            Eliminar Categoría
            <LuDelete size={18} />
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
