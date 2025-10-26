'use client';
import { useAuth } from '@/components/context/AuthContext';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Button from '@/components/ui/button/Button';
import CheckBox from '@/components/ui/checkbox/CheckBox';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import TextArea from '@/components/ui/textarea/Textarea';
import Title from '@/components/ui/title/Title';
import { useMutation } from '@/hooks/useMutation';
import { ResponsePersonal } from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { ProgramaSchema, ProgramaSchemaType } from '@/schemas/programa/programa.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { GoHome } from 'react-icons/go';
import { LuArrowLeft, LuCheck, LuLayers, LuSave } from 'react-icons/lu';

interface CreateProgramaProps {
  responsables: ResponsePersonal[];
}
export default function CreatePrograma({ responsables }: CreateProgramaProps) {
  const { token } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ProgramaSchema),
  });

  const watchNecesitaDeribacion = watch('deribacion', false);
  const watchResponsable = watch('responsable', { value: '', label: '' });

  const { mutate } = useMutation<ProgramaSchemaType>({
    mutationFn: async (data, urlApi) => {
      const { responsable, ...programa } = data;

      const parsedPrograma = {
        ...programa,
        responsableId: parseInt(responsable.value),
      };
      return axios.post(`${urlApi}/programa`, parsedPrograma, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      notify.success({
        message: 'Programa creado con éxito',
      });
      router.push('/programas');
    },
    onError: () => {
      notify.error({
        message: 'Error al crear el programa',
      });
    },
  });

  console.log(errors);
  return (
    <form
      className="flex w-full flex-col gap-y-4 p-5"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Programas',
            href: '/programas',
          },
          {
            title: 'Nuevo Programa',
            href: '/programas/crear',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Crear Programa"
          description="Define la información basica para un nuevo programa"
          icon={<LuLayers size={18} />}
        />
        <Button
          onClick={() => {
            router.back();
          }}
          type="button"
          className="border-ob-gray-4 border bg-transparent font-semibold text-white"
        >
          <LuArrowLeft size={18} />
          Volver
        </Button>
      </section>

      <InfoContainer className="bg-ob-black-6 flex flex-col gap-y-3">
        <span className="text-ob-gray-2 font-semibold">Informacion Basica</span>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Nombre del Programa"
            placeholder="Ej: PAP"
            id="nombre"
            {...register('nombre')}
            error={errors.nombre?.message}
          />
          <Select
            label="Responsable"
            placeholder="Seleccionar Responsable"
            options={responsables.map((responsable) => ({
              label: `${responsable.nombre} ${responsable.apellidoPaterno} ${responsable.apellidoMaterno}`,
              value: responsable.personalId.toString(),
            }))}
            onChange={(value) => setValue('responsable', value)}
            value={watchResponsable}
            error={errors.responsable?.message}
          />
        </div>
        <TextArea
          label="Descripcion"
          placeholder="Breve Descripcion del Procedimiento"
          rows={4}
          id="description"
          {...register('descripcion')}
          error={errors.descripcion?.message}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Cupo Maximo"
            placeholder="Ej: 100"
            id="cupo"
            {...register('cupoMaximo', { valueAsNumber: true })}
            error={errors.cupoMaximo?.message}
          />
          <CheckBox
            label="Necesita Derivacion"
            onChange={(val) => setValue('deribacion', val)}
            value={watchNecesitaDeribacion}
          >
            <span className="flex items-center gap-x-2">
              <LuCheck size={16} />
              Sí
            </span>
          </CheckBox>
        </div>
      </InfoContainer>
      <span className="flex w-full justify-end">
        <Button className="text-ob-black w-fit">
          <LuSave size={18} />
          Registrar
        </Button>
      </span>
    </form>
  );
}
