'use client';

import { useAuth } from '@/components/context/AuthContext';
import { useFilter } from '@/components/context/FilterContext';
import { useTableContext } from '@/components/context/TableContext';
import { useMutation } from '@/hooks/useMutation';
import { ResponseBlog } from '@/interface/blog-response.interface';
import { Response } from '@/interface/response.interface';
import axios from 'axios';
import { FilterInterface } from '../../fliters/filter.interface';
import { notify } from '@/libs/toast';
import Modal from '@/components/ui/modal/Modal';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { TbLogs } from 'react-icons/tb';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import { LuSave, LuX } from 'react-icons/lu';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import Warning from '@/components/ui/warning/Warning';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Button from '@/components/ui/button/Button';
import { env } from '@/config/env';

interface ModalPublishedProps {
  onClose: () => void;
  blogId: string;
}

export default function ModalPublished({ onClose, blogId }: ModalPublishedProps) {
  const { token } = useAuth();
  const { refresh } = useTableContext<ResponseBlog>();
  const { setMetadata } = useFilter<FilterInterface>();

  const { mutate } = useMutation<{ id: string }, Response<ResponseBlog[]>>({
    mutationFn: async (data) => {
      const res = await axios.patch(`${env.url_api}/blog/publish/${blogId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({ message: 'Blog publicado con éxito' });
      refresh(data.data);
      setMetadata({
        total: data?.metadata?.totalItems || 10,
        limit: 10,
        totalPage: data?.metadata?.totalPages || 1,
      });
      onClose();
    },
    onError: () => {
      notify.error({ message: 'Error al publicar el blog' });
    },
  });

  return (
    <Modal
      onClose={onClose}
      className={{
        container: 'max-w-[300px]',
      }}
    >
      <ModalHeader>
        <ModalTitle title="Publicar Blog" badge="Actualizar Estado">
          <TbLogs size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={16} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <ModalContent>
        <Warning>
          ¿Estás seguro de que deseas publicar este blog? Una vez publicado, será visible para todos
          los clientes.
        </Warning>
      </ModalContent>
      <ModalFooter>
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button
            onClick={() => {
              mutate({
                id: blogId,
              });
            }}
            className="bg-ob-teal font-semibold"
          >
            <LuSave size={18} />
            Publicar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
