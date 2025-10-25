import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Title from '@/components/ui/title/Title';
import { ResponseTurno } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import CreateTurno from '@/modules/personal/turno/create-modal/CreateTurno';
import TurnoTable from '@/modules/personal/turno/tabla/TurnoTable';
import { getToken } from '@/utils/getToken';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuClock, LuPersonStanding, LuPlus } from 'react-icons/lu';

export default async function TurnoPage() {
  const token = await getToken();

  const resTurnos = await fetcher<ResponseTurno[]>('turnos', {
    headers: {
      Authorization: `Bearer ${token}`,
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
            icon: <LuPersonStanding />,
            href: '/personal',
          },
          {
            title: 'Turnos',
            icon: <LuClock />,
            href: '/personal/turnos',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Turnos Médicos"
          description="Crea, importa y administra los turnos médicos."
          icon={<LuClock size={18} />}
        />
        <ButtonModal className="text-ob-black bg-ob-teal" modal={<CreateTurno />}>
          <LuPlus size={18} />
          Registrar Turno Personal
        </ButtonModal>
      </section>

      <TurnoTable data={resTurnos?.data || []} />
    </div>
  );
}
