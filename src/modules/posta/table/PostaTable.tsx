'use client';
import GoogleMapsIcon from '@/assets/svg/GoogleMapsIcon';
import Badge from '@/components/ui/badge/Badge';
import Table from '@/components/ui/table/Table';
import { Response, ResponsePosta } from '@/interface/response.interface';
import cx from '@/libs/cx';
import Link from 'next/link';
import { LuBuilding2 } from 'react-icons/lu';
import ButtonLink from '@/components/ui/link/Link';
import { TbEdit, TbTrash } from 'react-icons/tb';
import { FilterPosta } from '../types';
import { useFilter } from '@/components/context/FilterContext';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';

interface PostaTableProps {
  data: ResponsePosta[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function PostaTable({ data, ...props }: PostaTableProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FilterPosta>();

  const { data: queryData } = useQuery<Response<ResponsePosta[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/posta`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.status != '') {
        parseUrl.searchParams.append('status', filters.status);
      }

      if (filters.regionId != '') {
        parseUrl.searchParams.append('regionId', filters.regionId);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponsePosta[]> = res.data;
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
          header: '',
          cell: () => {
            return (
              <span className="block w-4">
                <LuBuilding2 className="text-ob-white size-4" />
              </span>
            );
          },
        },
        {
          header: 'Ruc',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.ruc}</span>;
          },
        },
        {
          header: 'Ipress',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.ipress?.toString()?.padStart(4, '0')}</span>;
          },
        },
        {
          header: 'Nombre',
          cell: ({ row }) => {
            return <span className="max-w-[200px] text-wrap">{row?.nombre}</span>;
          },
        },
        {
          header: 'Region',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.region?.nombre}</span>;
          },
        },
        {
          header: 'Provincia',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.provincia?.nombre}</span>;
          },
        },
        {
          header: 'Distrito',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row.distrito?.nombre}</span>;
          },
        },
        {
          header: 'Capacidad',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.capacidad}</span>;
          },
        },
        {
          header: 'Fecha de creación',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.fechaCreacion}</span>;
          },
        },
        {
          header: 'Fecha de inicio de actividad',
          cell: ({ row }) => {
            return <span className="text-nowrap">{row?.fechaInicioActividad}</span>;
          },
        },
        {
          header: 'Estado',
          cell: ({ row }) => {
            return (
              <Badge className={cx(row.estado ? 'bg-ob-green' : 'bg-ob-red')}>
                {row?.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            );
          },
        },
        {
          header: 'Ver en mapa',
          cell: ({ row }) => {
            return (
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${row?.lat},${row?.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center"
              >
                <GoogleMapsIcon className="size-8" />
              </Link>
            );
          },
        },
        {
          header: 'Acciones',
          cell: ({ row }) => {
            return (
              <div className="flex gap-2">
                <ButtonLink
                  href={`/posta/editar/${row?.postaId}`}
                  className="dark:text-ob-lightblue dark:bg-ob-black-2 w-1/2"
                >
                  <TbEdit className="size-[18px]" />
                  Editar
                </ButtonLink>
                <ButtonLink
                  href={`/posta/${row?.postaId}/delete`}
                  className="border-ob-gray w-1/2 border dark:bg-transparent dark:text-red-400"
                >
                  <TbTrash className="size-[18px]" />
                  Eliminar
                </ButtonLink>
              </div>
            );
          },
        },
      ]}
    />
  );
}
