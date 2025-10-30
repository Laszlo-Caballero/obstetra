'use client';
import { Modulo, Prioridad, Tipo } from '@/interface/response.interface';
import { ResponseUser } from '@/interface/user.interface';
import { fetcher } from '@/libs/fetch';
import { env } from '@/config/env';

import React from 'react';
import { ConsultaSchema, ConsultaSchemaType } from '@/schemas/ayuda/consulta.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { notify } from '@/libs/toast';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import { LuBookOpen, LuFlag, LuHouse, LuLayers, LuPhone, LuSend, LuX } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import { RxText } from 'react-icons/rx';
import Select from '@/components/ui/select/Select';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import TextArea from '@/components/ui/textarea/Textarea';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import SmallCard from '@/components/ui/small-card/SmallCard';
import Badge from '@/components/ui/badge/Badge';
import { GoGoal } from 'react-icons/go';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { useAuth } from '@/components/context/AuthContext';

interface CreateConsultaProps {
  modulos: Modulo[];
  tipos: Tipo[];
  prioridades: Prioridad[];
}
export default async function CreateConsulta({ modulos, tipos, prioridades }: CreateConsultaProps) {
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ConsultaSchema),
  });

  const watchPrioridad = watch('prioridad', { value: '', label: '' });
  const watchModulo = watch('modulo', { value: '', label: '' });
  const watchTipo = watch('tipo', { value: '', label: '' });

  const { mutate } = useMutation<ConsultaSchemaType>({
    mutationFn: async (data, urlApi) => {
      const res = await fetcher<ResponseUser>(`${env.url_api}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = res?.data;

      const { prioridad, tipo, modulo, ...programa } = data;

      const parsedPrograma = {
        ...programa,
        prioridadId: parseInt(prioridad.value),
        moduloId: parseInt(modulo.value),
        tipoId: parseInt(tipo.value),
        userId: user?.userId,
      };
      return axios.post(`${urlApi}/ayuda/consulta`, parsedPrograma, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      notify.success({
        message: 'Cunsulta registrada con éxito',
      });
    },
    onError: () => {
      notify.error({
        message: 'Error al crear la consulta',
      });
    },
  });

  return (
    <form
      className="flex w-full flex-col gap-y-4 p-5"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <LuHouse />,
            href: '/',
          },
          {
            title: 'Ayuda',
            href: '/ayuda/consulta',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <div className="flex items-start gap-x-2.5">
          <span className="bg-ob-blue-3 border-ob-blue rounded-xl border-3 p-1">
            <MdOutlineEmail className="text-ob-white" size={16} />
          </span>
          <div className="flex flex-col gap-y-0.5 font-medium">
            <h2 className="text-ob-white text-xl">Enviar una Consulta</h2>
            <p className="text-ob-gray-2 text-sm">
              Completa un formulario y nuestro equipo te responderá en brevedad
            </p>
          </div>
        </div>
        <Button className="text-ob-white border-ob-gray border bg-transparent" type="button">
          <LuBookOpen size={18} />
          Documentación
        </Button>
      </section>

      <form className="bg-ob-black-6 border-ob-gray rounded-3xl border p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-y-1.5">
            <Input
              placeholder="Breve descripción del Problema"
              label="Asunto"
              id="asunto"
              className={{ label: 'text-sm' }}
              icon={<RxText className="text-ob-white" size={18} />}
              {...register('asunto')}
              error={errors.asunto?.message}
            />
            <span className="text-ob-gray-2 text-xs">
              Se especifico. Ej. No puedo crear una cita
            </span>
          </div>
          <div className="flex flex-col gap-y-1.5">
            <Select
              label="Módulo Relacionado"
              placeholder="Seleccionar Modulo"
              search="Buscar Módulos..."
              className={{ label: 'text-sm' }}
              iconInput={<LuLayers className="text-ob-white" size={18} />}
              options={modulos.map((modulo) => ({
                label: modulo.nombre,
                value: modulo.moduloId.toString(),
              }))}
              onChange={(value) => setValue('modulo', value)}
              value={watchModulo}
              error={errors.modulo?.message}
            />
            <span className="text-ob-gray-2 text-xs">
              Obstetras, Admin, Citas, Laboratorio, Metas.
            </span>
          </div>
          <Select
            label="Prioridad"
            placeholder="Seleccionar Prioridad"
            search="Buscar Prioridad..."
            className={{ label: 'text-sm' }}
            iconInput={<LuFlag className="text-ob-white" size={18} />}
            options={prioridades.map((prioridad) => ({
              label: prioridad.nombre,
              value: prioridad.prioridadId.toString(),
            }))}
            onChange={(value) => setValue('prioridad', value)}
            value={watchPrioridad}
            error={errors.prioridad?.message}
          />
          <Select
            label="Tipo de Consulta"
            placeholder="Seleccionar Consulta"
            search="Buscar Consulta..."
            className={{ label: 'text-sm' }}
            iconInput={<IoMdHelpCircleOutline size={18} />}
            options={tipos.map((tipo) => ({
              label: tipo.nombre,
              value: tipo.tipoId.toString(),
            }))}
            onChange={(value) => setValue('tipo', value)}
            value={watchTipo}
            error={errors.tipo?.message}
          />
          <div className="col-start-1 col-end-3 flex flex-col gap-y-1.5">
            <TextArea
              placeholder="Describe lo ocurrido"
              label="Descripción"
              id="description"
              className={{ label: 'text-sm' }}
              rows={5}
              {...register('descripcion')}
              error={errors.descripcion?.message}
            />
            <span className="text-ob-gray-2 text-xs">
              Incluye capturas de pantalla o mensajes de error si los tienes
            </span>
          </div>

          <Input
            placeholder="nombre@ejemplo.com"
            label="Correo de contacto"
            id="email"
            className={{ label: 'text-sm' }}
            icon={<MdOutlineEmail size={18} />}
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            placeholder="+51 999 999 999"
            label="Teléfono (opcional)"
            id="phone"
            className={{ label: 'text-sm' }}
            icon={<LuPhone size={18} />}
            {...register('telefono')}
            error={errors.telefono?.message}
          />
        </div>
        <div className="border-ob-gray flex items-center justify-between border-t pt-4">
          <Button className="border-ob-gray text-ob-white border bg-transparent" type="button">
            <LuX size={18} />
            Cancelar
          </Button>
          <Button type="submit">
            <LuSend />
            Enviar Consulta
          </Button>
        </div>
      </form>
      <InfoContainer>
        <span>Preguntas Frecuentes</span>
        <SmallCard
          title="¿Cómo reinicio mi contraseña?"
          description="Ve a Admin > Usuarios > Restablecer Contraseña"
          icon={<IoMdHelpCircleOutline size={18} />}
        >
          <Badge className="bg-ob-blue-3 text-xs">Guia Rapida</Badge>
        </SmallCard>
        <SmallCard
          title="No veo mis metas del Mes"
          description="Revisa los filtros de año/mes en la vista Metas"
          icon={<GoGoal size={18} />}
        >
          <Badge className="bg-ob-blue-3 text-xs">Solucion</Badge>
        </SmallCard>

        <SmallCard
          title="Error al Completar Datos del Cliente"
          description='Usa el botón "Completar datos" en Laboratorio y valida campos obligatorios.'
          icon={<AiOutlineMedicineBox size={18} />}
        >
          <Badge className="bg-ob-blue-3 text-xs">Paso a paso</Badge>
        </SmallCard>
      </InfoContainer>
    </form>
  );
}
