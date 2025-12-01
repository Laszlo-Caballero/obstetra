'use client';
import { Response, ResponsePersonal } from '@/interface/response.interface';
import React from 'react';
import { FiltersPersonal } from '../type';
import { useFilter } from '@/components/context/FilterContext';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import Table from '@/components/ui/table/Table';
import Badge from '@/components/ui/badge/Badge';
import cx from '@/libs/cx';
import { FaEye } from 'react-icons/fa';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import { BiSolidEditAlt } from 'react-icons/bi';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import EliminarPersonal from '../Eliminar/EliminarPersonal';
import { LuTrash2 } from 'react-icons/lu';

interface TablaPersonalProps {
  data: ResponsePersonal[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaPersonal({ data, ...props }: TablaPersonalProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FiltersPersonal>();
  // const [selectedRow, setSelectedRow] = useState<ResponsePersonal | null>(null);
  // const [isOpen, setIsOpen] = useState(false);

  const { data: queryData } = useQuery<Response<ResponsePersonal[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/personal`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.status != '') {
        parseUrl.searchParams.append('status', filters.status);
      }

      if (filters.tipoPersonalId != '') {
        parseUrl.searchParams.append('tipoPersonalId', filters.tipoPersonalId);
      }

      if (filters.postaId != '') {
        parseUrl.searchParams.append('postaId', filters.postaId);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponsePersonal[]> = res.data;
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
            header: 'DNI',
            cell: ({ row }) => {
              return <span>{row?.dni}</span>;
            },
          },
          {
            header: 'Nombre',
            cell: ({ row }) => {
              return (
                <span>{`${row?.nombre} ${row?.apellidoPaterno} ${row?.apellidoMaterno}`}</span>
              );
            },
          },
          {
            header: 'Puesto',
            cell: ({ row }) => {
              return <span>{row?.tipoPersonal?.nombre}</span>;
            },
          },
          {
            header: 'Hospital',
            cell: ({ row }) => {
              return (
                <div>
                  {row.posta.map((tipo, i) => (
                    <span key={i}>
                      {tipo.nombre}
                      {i < row.posta.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              );
            },
          },
          {
            header: 'Correo',
            cell: ({ row }) => {
              return <span>{row?.correo}</span>;
            },
          },
          {
            header: 'Codigo',
            cell: ({ row }) => {
              return <span>{row?.codigoColegio}</span>;
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
                    href={`/personal/editar/${row.personalId}`}
                    className="bg-ob-blue-3 text-ob-lightblue"
                  >
                    <BiSolidEditAlt size={18} />
                    Editar
                  </ButtonLink>
                  <ButtonLink
                    href={`/personal/detalle/${row.personalId}`}
                    className="bg-ob-blue-3 text-ob-lightblue"
                  >
                    <FaEye size={18} />
                    Detalles
                  </ButtonLink>
                  <ButtonModal
                    className="border-ob-gray text-ob-white border bg-transparent"
                    modal={<EliminarPersonal id={row.personalId} personal={row} />}
                  >
                    <LuTrash2 size={18} />
                    Eliminar
                  </ButtonModal>
                </div>
              );
            },
          },
        ]}
      />
    </>
  );
}
