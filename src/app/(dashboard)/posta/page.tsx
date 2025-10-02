import React from 'react';
import { LuBuilding2 } from 'react-icons/lu';
import { HiOutlinePlus } from 'react-icons/hi2';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import { GoHome } from 'react-icons/go';
import { Region, ResponsePosta } from '@/interface/response.interface';
import PostaTable from '@/modules/posta/table/PostaTable';
import Mapa from '@/modules/posta/components/mapa/Mapa';
import { fetcher } from '@/libs/fetch';
import FilterSelect from '@/modules/posta/filters/FilterSelect';
import SearchPosta from '@/modules/posta/filters/SearchPosta';
import ExportButton from '@/modules/posta/components/export-button/ExportButton';
import Link from '@/components/ui/link/Link';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import { LuUpload } from 'react-icons/lu';
import ModalImport from '@/modules/posta/import/ModalImport';

export default async function PostaPage() {
  const data = await fetcher<ResponsePosta[]>('posta');

  // const rawPostas = await fetcher<Position[]>("posta/raw-postas");

  const regiones = await fetcher<Region[]>('utils/regiones');

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
            title: 'Postas',
            icon: <LuBuilding2 />,
            href: '/posta',
          },
        ]}
      />

      <section className="flex items-center">
        <div className="flex items-center gap-x-2.5">
          <span className="flex max-w-max items-center justify-center rounded-xl border border-white px-[6px] py-[5px]">
            <LuBuilding2 className="text-ob-white size-4" />
          </span>
          <div className="flex flex-col">
            <h2 className="text-xl font-medium">Administrar Postas</h2>
            <p className="text-ob-gray-2 max-w-[350px] text-sm font-medium">
              Crea, edita y organiza las postas para asignación de turnos.
            </p>
          </div>
        </div>

        <SearchPosta />

        <div className="ml-auto flex gap-x-2">
          <ExportButton />

          <ButtonModal
            className="border-ob-gray max-h-10 rounded-[6px] border bg-transparent text-white"
            modal={<ModalImport />}
          >
            <LuUpload />
            Importar
          </ButtonModal>

          <Link href="/posta/crear" className="max-h-10 text-white">
            <HiOutlinePlus />
            Nueva posta
          </Link>
        </div>
      </section>

      <FilterSelect regiones={regiones?.data} />

      <PostaTable
        data={data?.data || []}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
        limit={10}
      />

      <div className="mb-[41px] flex flex-col gap-y-3 p-[6px]">
        <h2 className="text-xl font-medium">Mapa de Postas</h2>

        <Mapa markers={[]} />
      </div>
    </div>
  );
}
