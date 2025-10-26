'use client';
import { useFilter } from '@/components/context/FilterContext';
import { ResponsePrograma, Response } from '@/interface/response.interface';
import React from 'react';
import { FiltersPrograma } from '../type';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import Table from '@/components/ui/table/Table';
import { LuHospital, LuTrash2, LuUser } from 'react-icons/lu';
import Badge from '@/components/ui/badge/Badge';
import cx from '@/libs/cx';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import { BiSolidEditAlt } from 'react-icons/bi';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import EliminarPrograma from '../Eliminar/EliminarPrograma';

interface TablaProgramaProps {
  data: ResponsePrograma[];
  total?: number;
  totalPage?: number;
  limit?: number;
}
export default function TablaPrograma({ data, ...props }: TablaProgramaProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FiltersPrograma>();

  const { data: queryData } = useQuery<Response<ResponsePrograma[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/programa`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.estado != '') {
        parseUrl.searchParams.append('estado', filters.estado);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      if (filters.searchByName != '') {
        parseUrl.searchParams.append('searchByName', filters.searchByName);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponsePrograma[]> = res.data;
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
    <Table
      metadata={metadata}
      initialMetadata={{
        total: props.total || 0,
        totalPage: props.totalPage || 0,
        limit: props.limit || 10,
      }}
      value={Number(filters.page) || 1}
      onChangePage={(page) => {
        setFilter('page', page.toString());
      }}
      initialData={data}
      data={queryData?.data}
      columns={[
        {
          header: 'Programa',
          cell: ({ row }) => {
            return (
              <span className="flex items-center gap-x-2">
                <LuHospital className="text-ob-white" size={22} />
                <p>{row?.nombre}</p>
              </span>
            );
          },
        },
        {
          header: 'Descripcion',
          cell: ({ row }) => {
            return <span className="block w-40">{row?.descripcion}</span>;
          },
        },
        {
          header: 'Responsable',
          cell: ({ row }) => {
            return (
              <span className="flex items-center gap-x-2">
                <LuUser className="text-ob-white" size={22} />
                <p>{`${row?.responsable?.nombre} ${row?.responsable?.apellidoPaterno} ${row?.responsable?.apellidoMaterno}`}</p>
              </span>
            );
          },
        },
        {
          header: 'Estado',
          cell: ({ row }) => {
            return (
              <Badge className={cx('text-ob-white', row.estado ? 'bg-ob-green' : 'bg-ob-red')}>
                {row.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            );
          },
        },
        {
          header: 'Acciones',
          cell: ({ row }) => {
            return (
              <div className="flex items-center gap-x-2">
                <ButtonLink
                  href={`/programas/editar/${row.programaId}`}
                  className="bg-ob-blue-3 text-ob-lightblue"
                >
                  <BiSolidEditAlt size={18} />
                  Editar
                </ButtonLink>
                <ButtonModal
                  className="border-ob-gray text-ob-white border bg-transparent"
                  modal={<EliminarPrograma id={row.programaId} programa={row} />}
                >
                  <LuTrash2 size={18} />
                  Eliminar
                </ButtonModal>
              </div>
            );
          },
        },
      ]}
    ></Table>
  );
}
