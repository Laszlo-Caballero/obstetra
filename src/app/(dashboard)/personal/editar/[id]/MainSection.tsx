'use client';
import { useMutation } from '@/hooks/useMutation';
import {
  ResponsePersonal,
  ResponsePosta,
  ResponseReniec,
  TipoPersonal,
  Turno,
} from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { PersonalSchema, PersonalSchemaType } from '@/schemas/personal/personal.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { env } from '@/config/env';
import { parse } from 'date-fns';

import { useForm } from 'react-hook-form';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import { GoHome } from 'react-icons/go';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import {
  LuArrowLeft,
  LuCalendar,
  LuCircleCheck,
  LuIdCard,
  LuPhone,
  LuPlus,
  LuSearch,
  LuUser,
  LuUserPlus,
} from 'react-icons/lu';
import Badge from '@/components/ui/badge/Badge';
import Input from '@/components/ui/input/input';
import Button from '@/components/ui/button/Button';
import InputDate from '@/components/ui/input-date/InputDate';
import Select from '@/components/ui/select/Select';
import TextArea from '@/components/ui/textarea/Textarea';
import MultiSelect from '@/components/ui/multiselect/MultiSelect';
import { sexoOptions } from '@/modules/personal/sexo';
import { findArray } from '@/utils/findArray';
import { capitalize } from '@/utils/capitalize';
import { useAuth } from '@/components/context/AuthContext';
interface BuscarDNIResponse {
  dni: string;
}

interface EditarPersonalProps {
  tipos: TipoPersonal[];
  postas: ResponsePosta[];
  turnos: Turno[];
  personal: ResponsePersonal;
}
export default function EditarPersonal({ tipos, turnos, postas, personal }: EditarPersonalProps) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(PersonalSchema),
    defaultValues: {
      dni: personal.dni,
      nombre: personal.nombre,
      apellido_paterno: personal.apellidoPaterno,
      apellido_materno: personal.apellidoMaterno,
      codigo: personal.codigoColegio,
      correo: personal.correo,
      fecha_nacimiento: personal.fechaNacimiento.split('T')[0],
      telefono: personal.telefono,
      nota: personal.nota,
      sexo: personal.sexo,
      turno: {
        label: `${personal.turno?.horaInicio} - ${personal.turno?.horaFin}`,
        value: personal.turno?.turnoId.toString() || '',
      },
      postas: personal.posta.map((posta) => ({
        label: posta.nombre,
        value: posta.postaId.toString(),
      })),
      tipoPersonal: {
        label: personal.tipoPersonal?.nombre || '',
        value: personal.tipoPersonal?.tipoPersonalId.toString() || '',
      },
    },
  });

  const watchTipo = watch('tipoPersonal', { value: '', label: '' });
  const { token } = useAuth();
  // const watchPostas = watch('postas', []);
  const watchTurno = watch('turno', { value: '', label: '' });
  const { mutate: create } = useMutation<PersonalSchemaType>({
    mutationFn: async (data, urlApi) => {
      const {
        turno,
        postas,
        tipoPersonal,
        apellido_materno,
        apellido_paterno,
        fecha_nacimiento,
        codigo,
        ...personal
      } = data;
      const parsedPersonal = {
        ...personal,
        apellidoMaterno: apellido_materno,
        apellidoPaterno: apellido_paterno,
        fechaNacimiento: fecha_nacimiento,
        codigoColegio: codigo,
        turnoId: parseInt(turno.value),
        postaId: postas.map((p) => parseInt(p.value)),
        tipoPersonalId: parseInt(tipoPersonal.value),
      };
      return axios.patch(`${urlApi}/personal/${id}`, parsedPersonal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      notify.success({
        message: 'Personal actualizado con éxito',
      });
      router.push('/personal');
    },
    onError: () => {
      notify.error({
        message: 'Error al actualizar el Personal',
      });
    },
  });

  const { mutate } = useMutation<BuscarDNIResponse, ResponseReniec>({
    mutationFn: async (data) => {
      const response = await axios.get(`${env.api_reniec}/reniec/${data.dni}`);
      return response.data;
    },
    onSuccess(data) {
      const { data: persona } = data;
      setValue('dni', persona.dni);
      setValue('nombre', persona.nombres);
      setValue('apellido_paterno', persona.apellidoPaterno);
      setValue('apellido_materno', persona.apellidoMaterno);
      setValue(
        'fecha_nacimiento',
        parse(persona.fechaNacimiento, 'dd/MM/yyyy', new Date()).toISOString().split('T')[0],
      );

      const parseSexo = capitalize(persona.sexo);

      setValue('sexo', parseSexo);
      notify.success({ message: 'Datos cargados correctamente' });
    },
    onError() {
      notify.error({ message: 'No se encontraron datos para el DNI ingresado' });
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Personal',
            href: '/personal',
          },
          {
            title: 'Editar',
            href: '/personal/editar',
          },
        ]}
      />
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit((data) => create(data))}>
        <InfoContainer className="dark:bg-ob-black-6 bg-white">
          <section className="flex items-center justify-between">
            <Title
              title="Editar Personal"
              description="Completa la información básica, asignación y seguridad"
              icon={<LuUserPlus size={18} />}
            />
            <span className="flex items-center gap-x-2">
              <Badge className="border-ob-gray flex items-center gap-x-2 border px-3 text-sm">
                <LuCircleCheck size={16} />
                Borrador
              </Badge>
              <Badge className="bg-ob-green px-3 text-sm">Activo</Badge>
            </span>
          </section>
          <section className="border-ob-gray flex gap-x-7 border-t pt-5">
            <div className="flex w-[50%] flex-col gap-y-3">
              <span className="text-ob-black-4 dark:text-ob-white text-lg">
                Informacion personal
              </span>
              <div className="flex gap-x-2">
                <Input
                  label="Documento de Identidad"
                  id="dni"
                  placeholder="123456789"
                  icon={<LuIdCard size={18} />}
                  className={{ input: 'placeholder: font-light', main: 'w-full' }}
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
                icon={<LuUser size={18} />}
                className={{ input: 'placeholder: font-light' }}
                {...register('nombre')}
                error={errors.nombre?.message}
              />
              <Input
                label="Apellidos Paterno"
                id="paterno"
                max={8}
                placeholder="Ñispe"
                className={{ input: 'placeholder: font-light' }}
                {...register('apellido_paterno')}
                error={errors.apellido_paterno?.message}
              />
              <Input
                label="Apellidos Materno"
                id="materno"
                max={8}
                placeholder="Ñispe"
                className={{ input: 'placeholder: font-light' }}
                {...register('apellido_materno')}
                error={errors.apellido_materno?.message}
              />
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Sexo"
                  placeholder="Masculino"
                  icon={<LuIdCard size={18} />}
                  disableSearch={true}
                  options={sexoOptions}
                  onChange={({ value }) => {
                    setValue('sexo', value);
                  }}
                  value={findArray(sexoOptions, 'value', watch('sexo'))}
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
                  label="Codigo Colegio"
                  id="colegio"
                  max={8}
                  placeholder="12345"
                  icon={<LuIdCard size={18} />}
                  className={{ input: 'placeholder: font-light' }}
                  {...register('codigo')}
                  error={errors.codigo?.message}
                />
                <Input
                  label="Telefono"
                  id="telefono"
                  max={8}
                  placeholder="123 156 148"
                  icon={<LuPhone size={18} />}
                  className={{ input: 'placeholder: font-light' }}
                  {...register('telefono')}
                  error={errors.telefono?.message}
                />
              </div>
              <Input
                label="Correo"
                id="correo"
                max={8}
                placeholder="Ñispe@gmail.com"
                className={{ input: 'placeholder: font-light' }}
                {...register('correo')}
                error={errors.correo?.message}
              />
            </div>
            <div className="flex w-[50%] flex-col justify-start gap-y-3">
              <span className="text-ob-black-4 dark:text-ob-white text-lg">Turno</span>
              <div className="flex gap-x-2">
                <Select
                  placeholder="Turnos Disponibles:"
                  label="Turno"
                  className={{
                    label: 'text-ob-black-4 dark:text-ob-white text-sm',
                    placeholder: 'w-[665px]',
                  }}
                  disableSearch={true}
                  options={turnos.map((turno) => ({
                    label: `${turno.horaInicio} - ${turno.horaFin}`,
                    value: turno.turnoId.toString(),
                  }))}
                  onChange={(value) => setValue('turno', value)}
                  value={watchTurno}
                  error={errors.turno?.message}
                />
                <Button className="bg-ob-teal self-end text-white" type="button">
                  <LuPlus size={18} />
                  Nuevo Turno
                </Button>
              </div>
              <span className="text-ob-black-4 dark:text-ob-white text-lg">Tipo de Personal</span>
              <Select
                placeholder="Tipo Personal"
                label="tipo"
                className={{ label: 'text-ob-black-4 dark:text-ob-white text-sm' }}
                disableSearch={true}
                options={tipos.map((tipo) => ({
                  label: tipo.nombre,
                  value: tipo.tipoPersonalId.toString(),
                }))}
                onChange={(value) => setValue('tipoPersonal', value)}
                value={watchTipo}
                error={errors.tipoPersonal?.message}
              />
              <span className="text-ob-black-4 dark:text-ob-white text-lg">Asignación Postas</span>
              <MultiSelect
                label="Postas:"
                placeholder="Seleccionar Postas:"
                options={postas.map((posta) => ({
                  label: posta.nombre,
                  value: posta.postaId.toString(),
                }))}
                value={watch('postas')}
                onChange={(selected) => setValue('postas', selected)}
                error={errors.postas?.message}
              />
              <span className="text-ob-black-4 dark:text-ob-white text-lg">
                Informacion Adicional
              </span>
              <TextArea
                label="Nota"
                placeholder="Escribe una Nota"
                rows={3}
                onChange={(e) => {
                  setValue('nota', e.target.value);
                }}
                value={watch('nota') || ''}
              />
            </div>
          </section>
        </InfoContainer>
        <div className="flex items-center justify-end gap-x-2">
          <Button
            onClick={() => {
              router.back();
            }}
            type="button"
            className="border-ob-white-3 dark:border-ob-gray-4 text-ob-black-4 border bg-transparent font-semibold dark:text-white"
          >
            <LuArrowLeft size={18} />
            Volver
          </Button>
          <Button className="bg-ob-teal font-semibold text-white" type="submit">
            <LuCircleCheck size={18} />
            Actulizar Personal
          </Button>
        </div>
      </form>
    </div>
  );
}
