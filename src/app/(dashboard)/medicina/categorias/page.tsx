import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Title from '@/components/ui/title/Title';
import { Categoria } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import ModalCreateCategory from '@/modules/medicina/categoria/crear/ModalCreateCategory';
import SearchCategoria from '@/modules/medicina/categoria/filters/SearchCategoria';
import TableCategoria from '@/modules/medicina/categoria/tabla/TableCategoria';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuPill, LuPlus } from 'react-icons/lu';

export default async function CategoriasPage() {
  const data = await fetcher<Categoria[]>('farmacia/categoria');
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
            title: 'Categorías',
            href: '/medicina/categorias',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Categorias de Medicinas"
          description="Crea, importa y administra el inventario de medicamentos."
          icon={<LuPill size={18} />}
        />
        <ButtonModal className="text-ob-black bg-ob-teal" modal={<ModalCreateCategory />}>
          <LuPlus size={18} />
          Registrar Categoría
        </ButtonModal>
      </section>
      <SearchCategoria />

      <TableCategoria
        data={data?.data || []}
        limit={10}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
      />
    </div>
  );
}
