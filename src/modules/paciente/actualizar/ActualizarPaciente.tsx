'use client';
import Button from '@/components/ui/button/Button';
import InputDate from '@/components/ui/input-date/InputDate';
import Input from '@/components/ui/input/input';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import TextArea from '@/components/ui/textarea/Textarea';
import { PacienteSchema, PacienteType } from '@/schemas/paciente/paciente.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  LuCalendar,
  LuIdCard,
  LuMapPin,
  LuPhone,
  LuSave,
  LuSearch,
  LuUser,
  LuX,
} from 'react-icons/lu';
import { parse } from 'date-fns';
import { useMutation } from '@/hooks/useMutation';
import { Response, ResponsePaciente, ResponseReniec } from '@/interface/response.interface';
import axios, { AxiosError } from 'axios';
import { env } from '@/config/env';
import { notify } from '@/libs/toast';
import { useTableContext } from '@/components/context/TableContext';
import { useFilter } from '@/components/context/FilterContext';
import { FilterPaciente } from '../types';
import { useAuth } from '@/components/context/AuthContext';
import { useQuery } from '@/hooks/useQuery';

interface CrearPacienteProps {
  onClose?: () => void;
  dni: string;
}

interface BuscarDNIResponse {
  dni: string;
}

export default function ActualizarPaciente({ onClose, dni }: CrearPacienteProps) {
  const { refresh } = useTableContext<ResponsePaciente>();
  const { setMetadata } = useFilter<FilterPaciente>();
  const { token } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(PacienteSchema),
  });

  const { data } = useQuery<Response<ResponsePaciente>>({
    queryFn: async (url) => {
      const res = await axios.get(`${url}/pacientes/${dni}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      const paciente = data.data;
      setValue('dni', paciente.dni);
      setValue('nombres', paciente.nombres);
      setValue('apellido_paterno', paciente.apellido_paterno);
      setValue('apellido_materno', paciente.apellido_materno);
      setValue('fecha_nacimiento', paciente.fecha_nacimiento.split('T')[0]);
      setValue('sexo', paciente.sexo);
      setValue('direccion', paciente.direccion);
      setValue('departamento', paciente.departamento);
      setValue('provincia', paciente.provincia);
      setValue('distrito', paciente.distrito);
      setValue('telefono', paciente.telefono);
      setValue('nota', paciente.nota);
    }
  }, [data]);

  const { mutate: create } = useMutation<PacienteType, Response<ResponsePaciente[]>>({
    mutationFn: async (data, urlApi) => {
      const res = await axios.patch(`${urlApi}/pacientes/${dni}`, data);

      return res.data;
    },
    onSuccess: (data) => {
      notify.success({ message: 'Paciente creado correctamente' });
      refresh(data.data);
      setMetadata({
        total: data?.metadata?.totalItems || 10,
        limit: 10,
        totalPage: data?.metadata?.totalPages || 1,
      });
      onClose?.();
    },
    onError: (error) => {
      const typedError = error as AxiosError;

      const message = typedError.response?.data as { message: string };
      if (message?.message) {
        notify.error({ message: message.message });
      } else {
        notify.error({ message: 'Error al crear el paciente' });
      }
    },
  });

  const onSubmit = (data: PacienteType) => {
    create(data);
  };

  const { mutate } = useMutation<BuscarDNIResponse, ResponseReniec>({
    mutationFn: async (data) => {
      const response = await axios.get(`${env.api_reniec}/reniec/${data.dni}`);
      return response.data;
    },
    onSuccess(data) {
      const { data: persona } = data;
      setValue('dni', persona.dni);
      setValue('nombres', persona.nombres);
      setValue('apellido_paterno', persona.apellidoPaterno);
      setValue('apellido_materno', persona.apellidoMaterno);
      setValue(
        'fecha_nacimiento',
        parse(persona.fechaNacimiento, 'dd/MM/yyyy', new Date()).toISOString().split('T')[0],
      );
      setValue('sexo', persona.sexo);
      setValue('direccion', persona.direccion);
      setValue('departamento', persona.departamento);
      setValue('provincia', persona.provincia);
      setValue('distrito', persona.distrito);
      notify.success({ message: 'Datos cargados correctamente' });
    },
    onError() {
      notify.error({ message: 'No se encontraron datos para el DNI ingresado' });
    },
  });

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <ModalTitle title="Editar Paciente" badge="Editar Estado">
            <LuUser size={20} />
          </ModalTitle>
          <CloseButton>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </ModalHeader>
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="flex gap-x-2">
            <Input
              label="Documento de Identidad"
              id="dni"
              placeholder="123456789"
              icon={<LuIdCard size={18} />}
              className={{ input: 'placeholder: font-light' }}
              {...register('dni')}
              error={errors.dni?.message}
            />
            <Button
              type="button"
              className="bg-ob-teal self-end"
              onClick={() => {
                mutate({ dni: watch('dni') });
              }}
            >
              <LuSearch size={18} className="text-white" />
            </Button>
          </div>
          <Input
            label="Nombres"
            id="nombre"
            placeholder="Ñepito"
            icon={<LuIdCard size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('nombres')}
            error={errors.nombres?.message}
          />
          <Input
            label="Apellidos Paterno"
            id="paterno"
            max={8}
            placeholder="Ñispe"
            icon={<LuIdCard size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('apellido_paterno')}
            error={errors.apellido_paterno?.message}
          />
          <Input
            label="Apellidos Materno"
            id="materno"
            max={8}
            placeholder="Ñispe"
            icon={<LuIdCard size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('apellido_materno')}
            error={errors.apellido_materno?.message}
          />
          <InputDate
            id="fecha_nacimiento"
            label="Fecha de Nacimiento"
            icon={<LuCalendar size={18} />}
            onChange={(date) => {
              setValue('fecha_nacimiento', date.toISOString().split('T')[0]);
            }}
            value={
              watch('fecha_nacimiento')
                ? parse(watch('fecha_nacimiento'), 'yyyy-MM-dd', new Date())
                : undefined
            }
            error={errors.fecha_nacimiento?.message}
          />
          <Input
            label="Sexo"
            id="sexo"
            placeholder="Femenino, Masculino"
            icon={<LuUser size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('sexo')}
            error={errors.sexo?.message}
          />
          <Input
            label="Telefono"
            id="telefono"
            placeholder="958 154 162"
            icon={<LuPhone size={18} />}
            className={{ input: 'placeholder: font-light' }}
            {...register('telefono')}
            error={errors.telefono?.message}
          />
          <Input
            label="Dirección"
            id="direcciion"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: 'placeholder: font-light',
            }}
            {...register('direccion')}
            error={errors.direccion?.message}
          />

          <Input
            label="Departamento"
            id="departamento"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: 'placeholder: font-light',
            }}
            {...register('departamento')}
            error={errors.departamento?.message}
          />
          <Input
            label="Provincia"
            id="provincia"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: 'placeholder: font-light',
            }}
            {...register('provincia')}
            error={errors.provincia?.message}
          />

          <Input
            label="Distrito"
            id="distrito"
            placeholder="Calle Numero Distrito"
            icon={<LuMapPin size={18} />}
            className={{
              input: 'placeholder: font-light',
            }}
            {...register('distrito')}
            error={errors.distrito?.message}
          />

          <TextArea
            label="Notas"
            placeholder="Alergias, antecedentes u otra informacion relevante"
            id="notas"
            rows={3}
            className={{ main: 'col-start-1 col-end-3' }}
            {...register('nota')}
          />
        </div>

        <ModalFooter nota="Al guardar, el paciente se añadirá al padrón.">
          <ContainerButton>
            <CloseButton type="button">Cancelar</CloseButton>
            <Button type="submit" className="bg-ob-teal font-semibold">
              <LuSave size={18} />
              Actualizar Paciente
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
