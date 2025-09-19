import React from 'react';
import SmallCard from '@/components/ui/small-card/SmallCard';
import CrearModulo from '@/modules/ayuda/crear-modulo/CrearModulo';
import CrearTipo from '@/modules/ayuda/crear-tipo/CrearTipo';
import Documentacion from '@/modules/ayuda/documentacion/Documentacion';

import { LuHouse, LuBookOpen, LuFolderPlus, LuPlus } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { GoGoal } from 'react-icons/go';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import { fetcher } from '@/libs/fetch';
import {
  Modulo,
  Prioridad,
  ResponseConsulta,
  ResponseDocumentacion,
  Tipo,
} from '@/interface/response.interface';
import TablaAdmistrar from '@/modules/ayuda/tabla/TablaAdmistrar';
import FiltersAdministrar from '@/modules/ayuda/filtros/FiltersAdministrar';
import { cookies } from 'next/headers';

export default async function AdministrarPage() {
  const cookieStore = await cookies();

  const data = await fetcher<ResponseConsulta[]>('ayuda/consulta');

  const modulos = await fetcher<Modulo[]>('ayuda/modulo/raw-modulos');

  const prioridades = await fetcher<Prioridad[]>('ayuda/prioridad/raw-prioridad');

  const tipos = await fetcher<Tipo[]>('ayuda/tipo-consulta/raw-tipos');
  const documentacion = await fetcher<ResponseDocumentacion[]>('documentacion', {
    headers: {
      Authorization: `Bearer ${cookieStore.get('obstetra_token')?.value}`,
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <LuHouse />,
            href: '/',
          },
          {
            title: 'Ayuda',
            href: '/ayuda/administrar',
          },
        ]}
      />

      {/* Titulo */}

      <section className="flex items-center justify-between">
        <div className="text-ob-white flex items-start gap-x-2.5 font-medium">
          <span className="bg-ob-blue-3 border-ob-teal rounded-xl border-3 p-1">
            <MdOutlineEmail size={16} />
          </span>
          <div className="flex flex-col gap-y-0.5">
            <h2 className="text-xl">Consultas Enviadas</h2>
            <p className="text-ob-gray-2 text-sm">
              Aca se listan las consultas realizadas por el usuario
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <ButtonModal
            className="text-ob-white border-ob-gray border bg-transparent"
            modal={<Documentacion data={documentacion?.data} />}
          >
            <LuBookOpen size={18} />
            Documentación
          </ButtonModal>

          <ButtonModal className="text-ob-black-4 bg-ob-teal" modal={<CrearModulo />}>
            <LuPlus size={18} />
            Agregar Modulos
          </ButtonModal>

          <ButtonModal className="text-ob-black-4 bg-ob-teal" modal={<CrearTipo />}>
            <LuFolderPlus size={18} />
            Agregar Tipos de Consulta
          </ButtonModal>
        </div>
      </section>

      {/* Tabla */}

      <div className="bg-ob-black-6 border-ob-gray flex flex-col gap-y-3 rounded-3xl border p-4.5">
        <div className="flex items-center justify-between">
          <FiltersAdministrar
            modulos={modulos?.data || []}
            prioridades={prioridades?.data || []}
            tipos={tipos?.data || []}
          />
          <span className="bg-ob-black-4 border-ob-gray rounded-xl border px-3 py-2 text-sm">
            Total: 10
          </span>
        </div>
        <div className="border-ob-gray overflow-hidden rounded-3xl border text-left text-sm font-medium">
          <TablaAdmistrar
            data={data?.data || []}
            limit={10}
            total={data?.metadata?.totalItems}
            totalPage={data?.metadata?.totalPages}
          />
        </div>
      </div>
      <div className="bg-ob-black-6 border-ob-gray flex flex-col gap-y-3 rounded-3xl border p-4">
        <span>Preguntas Frecuentes</span>
        <SmallCard
          title="¿Cómo reinicio mi contraseña?"
          description="Ve a Admin > Usuarios > Restablecer Contraseña"
          icon={<IoMdHelpCircleOutline size={18} />}
        />
        <SmallCard
          title="No veo mis metas del Mes"
          description="Revisa los filtros de año/mes en la vista Metas"
          icon={<GoGoal size={18} />}
        />
        <SmallCard
          title="Error al Completar Datos del Cliente"
          description='Usa el botón "Completar datos" en Laboratorio y valida campos obligatorios.'
          icon={<AiOutlineMedicineBox size={18} />}
        />
      </div>
    </div>
  );
}
