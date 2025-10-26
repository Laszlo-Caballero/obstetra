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
import { useMutation } from '@/hooks/useMutation';
import { useQuery } from '@/hooks/useQuery';
import { ModalProps } from '@/interface/moda.interface';
import { Response, ResponseTurno } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { TurnoInput, TurnoSchema } from '@/schemas/personal/turno/turno.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LuClock, LuX } from 'react-icons/lu';

interface UpdateTurnoProps extends ModalProps {
  turnoId: number;
}

export default function UpdateTurno({ onClose, turnoId }: UpdateTurnoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(TurnoSchema),
  });

  const { token } = useAuth();

  const { data } = useQuery<Response<ResponseTurno>>({
    queryFn: async (urlApi) => {
      const res = await axios.get(`${urlApi}/turnos/${turnoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      const turno = data.data;
      setValue('horaInicio', turno.horaInicio);
      setValue('horaFin', turno.horaFin);
    }
  }, [data]);

  const { refresh } = useTableContext<ResponseTurno>();

  const { mutate } = useMutation<TurnoInput, Response<ResponseTurno[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.patch(`${urlApi}/turnos/${turnoId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess(data) {
      refresh(data.data);
      notify.success({
        message: 'Turno creado exitosamente',
      });
      onClose?.();
    },
    onError() {
      notify.error({
        message: 'Error al crear turno',
      });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Actualizar turno" badge="Actualizar">
          <LuClock size={18} className="text-ob-white" />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <form onSubmit={handleSubmit(mutate)}>
        <ModalContent>
          <div className="flex flex-col gap-y-2">
            <Input
              label="Hora de Inicio"
              id="horaInicio"
              placeholder="8:00 am"
              {...register('horaInicio')}
              error={errors.horaInicio?.message}
            />

            <Input
              label="Hora de Fin"
              id="horaFin"
              placeholder="5:00 pm"
              {...register('horaFin')}
              error={errors.horaFin?.message}
            />
          </div>
        </ModalContent>

        <ModalFooter>
          <ContainerButton>
            <CloseButton>Cancelar</CloseButton>

            <Button>Actualizar Turno</Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
