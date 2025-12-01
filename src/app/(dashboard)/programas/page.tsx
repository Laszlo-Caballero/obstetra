import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { ResponsePrograma } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import FiltrosPrograma from '@/modules/programas/Filtros/FiltrosPrograma';
import SearchPrograma from '@/modules/programas/Filtros/SearchPrograma';
import TablaPrograma from '@/modules/programas/Tabla/TablaPrograma';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuLayers, LuPlus, LuUpload } from 'react-icons/lu';

export default async function ProgramaPage() {
  const data = await fetcher<ResponsePrograma[]>('programa');
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
            title: 'Programas',
            href: '/programas',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Catálogo de Programas"
          description="Crea, importa y administra los programas disponibles."
          icon={<LuLayers size={18} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="bg-ob-teal text-white">
            <LuUpload size={18} />
            Importar
          </Button>
          <ButtonLink className="bg-ob-teal text-white" href="/programas/crear">
            <LuPlus size={18} />
            Registrar Programa
          </ButtonLink>
        </div>
      </section>
      <InfoContainer className="dark:bg-ob-black-6 bg-white">
        <div className="flex items-center gap-x-2">
          <SearchPrograma />
          <FiltrosPrograma />
        </div>
        <TablaPrograma
          data={data?.data || []}
          total={data?.metadata?.totalItems}
          totalPage={data?.metadata?.totalPages}
          limit={10}
        />
      </InfoContainer>
    </div>
  );
}
