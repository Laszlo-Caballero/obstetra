'use client';

import { useFilter } from '@/components/context/FilterContext';
import Table from '@/components/ui/table/Table';
import React from 'react';
import { FilterPaciente } from '../types';
import { Response, ResponsePaciente } from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { AnimatePresence } from 'motion/react';
import ActualizarPaciente from '../actualizar/ActualizarPaciente';
import Badge from '@/components/ui/badge/Badge';
import EliminarPaciente from '../eliminar/EliminarPaciente';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';

interface PacienteTableProps {
  data: ResponsePaciente[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function PacienteTable({ data, ...props }: PacienteTableProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FilterPaciente>();
  const updateModal = useModal('');

  const { data: queryData } = useQuery<Response<ResponsePaciente[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/pacientes`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.dni != '') {
        parseUrl.searchParams.append('dni', filters.dni);
      }

      if (filters.status != '') {
        parseUrl.searchParams.append('status', filters.status);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponsePaciente[]> = res.data;
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });
      return data;
    },
    dependencies: [filters],
  });

  return (
    <>
      <Table
        metadata={metadata}
        initialMetadata={{
          limit: props.limit || 10,
          total: props.total || 0,
          totalPage: props.totalPage || 0,
        }}
        initialData={data}
        value={Number(filters.page) || 1}
        onChangePage={(page) => {
          setFilter('page', page.toString());
        }}
        data={queryData?.data}
        columns={[
          {
            header: 'DNI',
            accessorKey: 'dni',
          },
          {
            header: 'Nombres',
            accessorKey: 'nombres',
          },
          {
            header: 'Apellidos',
            cell: ({ row }) => {
              const { apellido_materno, apellido_paterno } = row;
              return (
                <span>
                  {apellido_paterno} {apellido_materno}
                </span>
              );
            },
          },
          {
            header: 'Fecha de Nacimiento',
            cell: ({ row }) => {
              return <span>{row.fecha_nacimiento?.split('T')[0]}</span>;
            },
          },
          {
            header: 'Teléfono',
            accessorKey: 'telefono',
          },
          {
            header: 'Dirección',
            cell: ({ row }) => {
              return (
                <span>
                  {row.departamento} / {row.provincia || 'N/A'} / {row.distrito || 'N/A'}
                </span>
              );
            },
          },
          {
            header: 'Estado',
            cell: ({ row }) => {
              return <Badge>{row.estado ? 'Activo' : 'Inactivo'}</Badge>;
            },
          },
          {
            header: 'Acciones',
            cell: ({ row }) => {
              return (
                <div className="flex gap-2">
                  <ButtonLink
                    href={`/paciente/${row.dni}`}
                    className="text-ob-lightblue bg-ob-black-2 w-1/2"
                  >
                    <TbEye className="size-[18px]" />
                    Ver
                  </ButtonLink>
                  <Button
                    //   href={`/posta/editar/${row.postaId}`}
                    className="text-ob-lightblue bg-ob-black-2 w-1/2"
                    onClick={() => updateModal.openModal(row.dni)}
                  >
                    <TbEdit className="size-[18px]" />
                    Editar
                  </Button>
                  <ButtonModal
                    //   href={`/posta/${row.dni}/delete`}
                    className="border-ob-gray w-1/2 border bg-transparent text-red-400"
                    modal={<EliminarPaciente dni={row.dni} paciente={row} />}
                  >
                    <TbTrash className="size-[18px]" />
                    Eliminar
                  </ButtonModal>
                </div>
              );
            },
          },
        ]}
      />
      <AnimatePresence>
        {updateModal.isOpen && (
          <ActualizarPaciente onClose={updateModal.closeModal} dni={updateModal.id} />
        )}
      </AnimatePresence>
    </>
  );
}
