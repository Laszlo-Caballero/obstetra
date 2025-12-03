import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import FiltradoCita from '@/modules/citas/Filtros/FiltradoCita';
import SearchCita from '@/modules/citas/Filtros/SearchCita';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuCalendar, LuDownload, LuPlus } from 'react-icons/lu';
import { fetcher } from '@/libs/fetch';
import { ResponseCita } from '@/interface/response.interface';
import TablaCita from '@/modules/citas/tabla/TablaCita';
import { getToken } from '@/utils/getToken';

export default async function AdministrarPage() {
  const token = await getToken();

  const data = await fetcher<ResponseCita[]>('cita?page=1&limit=12', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-2 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Citas',
            href: '/citas',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Citas Asignadas"
          description="Revisa y Gestiona las citas: personal, paciente, receta, diagnostico, etc"
          icon={<LuCalendar size={16} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="bg-ob-black-2 text-ob-lightblue">
            <LuDownload size={18} />
            Exportar
          </Button>
          <ButtonLink className="text-ob-white bg-ob-blue" href="/citas/crear">
            <LuPlus size={18} />
            Registrar Cita
          </ButtonLink>
        </div>
      </section>

      <InfoContainer className="bg-ob-black-3">
        <div className="flex items-center gap-x-3">
          <SearchCita />
          <FiltradoCita />
        </div>
      </InfoContainer>

      <TablaCita
        data={data?.data || []}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
        limit={12}
      />
    </div>
  );
}
