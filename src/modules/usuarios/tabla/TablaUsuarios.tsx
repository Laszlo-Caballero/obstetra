'use client';
import { Response } from '@/interface/response.interface';
import { ResponseUser } from '@/interface/user.interface';
import React from 'react';
import { FiltersUsuarios } from '../type';
import { useFilter } from '@/components/context/FilterContext';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import Table from '@/components/ui/table/Table';
import Badge from '@/components/ui/badge/Badge';
import cx from '@/libs/cx';
import { FaEye } from 'react-icons/fa';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import { BiSolidEditAlt } from 'react-icons/bi';
import { LuTrash2 } from 'react-icons/lu';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';

interface TablaUsuariosProps {
  data: ResponseUser[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaUsuarios({ data, ...props }: TablaUsuariosProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FiltersUsuarios>();

  const { data: queryData } = useQuery<Response<ResponseUser[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/usuarios`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page || '1');

      if (filters.search) {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponseUser[]> = res.data;
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
            header: 'Usuario',
            cell: ({ row }) => {
              return <span>{row?.user}</span>;
            },
          },
          {
            header: 'Nombre Completo',
            cell: ({ row }) => {
              return (
                <span>{`${row?.personal?.nombre} ${row?.personal?.apellidoPaterno} ${row?.personal?.apellidoMaterno}`}</span>
              );
            },
          },
          {
            header: 'Correo',
            cell: ({ row }) => {
              return <span>{row?.personal?.correo}</span>;
            },
          },
          {
            header: 'DNI',
            cell: ({ row }) => {
              return <span>{row?.personal?.dni}</span>;
            },
          },
          {
            header: 'Estado',
            cell: ({ row }) => {
              return (
                <Badge
                  className={cx('text-white', row?.personal?.estado ? 'bg-ob-green' : 'bg-ob-red')}
                >
                  {row?.personal?.estado ? 'Activo' : 'Inactivo'}
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
                    href={`/usuarios/editar/${row.userId}`}
                    className="bg-ob-blue-3 text-ob-lightblue"
                  >
                    <BiSolidEditAlt size={18} />
                    Editar
                  </ButtonLink>
                  {/* <ButtonLink
                    href={`/usuarios/detalle/${row.userId}`}
                    className="bg-ob-blue-3 text-ob-lightblue"
                  >
                    <FaEye size={18} />
                    Detalles
                  </ButtonLink> */}
                  {/* <ButtonModal
                    className="border-ob-white-3 dark:border-ob-gray text-ob-black-4 dark:text-ob-white border bg-transparent"
                    modal={<div>Eliminar Modal Placeholder</div>}
                  >
                    <LuTrash2 size={18} />
                    Eliminar
                  </ButtonModal> */}
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
}
