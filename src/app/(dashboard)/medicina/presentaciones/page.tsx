import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Title from '@/components/ui/title/Title';
import { ResponsePresentacion } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import CrearPresentacionModal from '@/modules/medicina/presentaciones/crear/CrearPresentacionModal';
import SearchPresentacion from '@/modules/medicina/presentaciones/filters/SearchPresentacion';
import TablaPresentacion from '@/modules/medicina/presentaciones/tabla/TablaPresentacion';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuPill, LuPlus } from 'react-icons/lu';

export default async function PresentacionesPage() {
  const data = await fetcher<ResponsePresentacion[]>('farmacia/presentacion');
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
            title: 'Medicina',
            href: '/medicina',
          },
          {
            title: 'Presentaciones',
            href: '/medicina/presentaciones',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Presentaciones de Medicinas"
          description="Crea, importa y administra el inventario de medicamentos."
          icon={<LuPill size={18} />}
        />
        <ButtonModal className="text-ob-black bg-ob-teal" modal={<CrearPresentacionModal />}>
          <LuPlus size={18} />
          Registrar Presentación
        </ButtonModal>
      </section>
      <SearchPresentacion />

      <TablaPresentacion
        data={data?.data || []}
        limit={10}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
      />
    </div>
  );
}
