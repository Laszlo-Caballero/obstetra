import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Button from '@/components/ui/button/Button';
import Title from '@/components/ui/title/Title';
import { ResponsePaciente } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import {
  SearchPacienteByDni,
  SearchPacienteByName,
} from '@/modules/paciente/components/filters/SearchPaciente';
import FilterSelect from '@/modules/paciente/components/filters/StatusFilter';
import CrearPaciente from '@/modules/paciente/crear/CrearPaciente';
import PacienteTable from '@/modules/paciente/table/PacienteTable';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuUpload, LuUserPlus, LuUsers } from 'react-icons/lu';

export default async function PacientePage() {
  const data = await fetcher<ResponsePaciente[]>('pacientes');

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
            title: 'Paciente',
            href: '/',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Pacientes"
          description="Registra nuevos pacientes y consulta historiales"
          icon={<LuUsers size={18} />}
        />
        <div className="flex gap-x-1.5">
          <Button className="border-ob-gray text-ob-white border bg-transparent">
            <LuUpload className="text-ob-white" size={18} />
            Importar
          </Button>

          <ButtonModal className="bg-ob-teal text-ob-black-6" modal={<CrearPaciente />}>
            <LuUserPlus size={18} />
            Nuevo Paciente
          </ButtonModal>
        </div>
      </section>

      <div className="flex gap-x-4">
        <SearchPacienteByName />
        <SearchPacienteByDni />
        <FilterSelect />
      </div>

      <PacienteTable
        data={data?.data || []}
        total={data?.metadata?.totalItems}
        totalPage={data?.metadata?.totalPages}
        limit={10}
      />
    </div>
  );
}
