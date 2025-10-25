import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Title from '@/components/ui/title/Title';
import { ResponseTipoPersonal } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import CreateTipoPersonal from '@/modules/personal/tipo-personal/modal-create/CreateTipoPersonal';
import TablaTipoPersonal from '@/modules/personal/tipo-personal/tabla/TablaTipoPersonal';
import { getToken } from '@/utils/getToken';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuPersonStanding, LuPlus } from 'react-icons/lu';

export default async function TipoPersonalPage() {
  const token = await getToken();

  const resPersonal = await fetcher<ResponseTipoPersonal[]>('tipo-personal', {
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
            title: 'Tipo de Personal',
            icon: <LuPersonStanding />,
            href: '/personal/tipo-personal',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Tipo de Personal Médico"
          description="Crea, importa y administra el inventario de medicamentos."
          icon={<LuPersonStanding size={18} />}
        />
        <ButtonModal className="text-ob-black bg-ob-teal" modal={<CreateTipoPersonal />}>
          <LuPlus size={18} />
          Registrar Tipo de Personal
        </ButtonModal>
      </section>

      <TablaTipoPersonal data={resPersonal?.data || []} />
    </div>
  );
}
