'use client';
import { useFilter } from '@/components/context/FilterContext';
import Table from '@/components/ui/table/Table';
import { Response, ResponseConsulta } from '@/interface/response.interface';
import { FaRegDotCircle } from 'react-icons/fa';
import { FilterAdministrar } from '../types';
import { useState } from 'react';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import EditarEstado from '../editar-estado/EditarEstado';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import { LuLayers } from 'react-icons/lu';
import Badge from '@/components/ui/badge/Badge';
interface TablaAdmistrarProps {
  data: ResponseConsulta[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaAdmistrar({ data, ...props }: TablaAdmistrarProps) {
  const { filters, setFilter } = useFilter<FilterAdministrar>();
  const [metadata, setMetadata] = useState(props);

  const { data: queryData } = useQuery<ResponseConsulta[]>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/ayuda/consulta`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.moduloId != '') {
        parseUrl.searchParams.append('moduloId', filters.moduloId);
      }

      if (filters.prioridadId != '') {
        parseUrl.searchParams.append('prioridadId', filters.prioridadId);
      }
      if (filters.tipoId != '') {
        parseUrl.searchParams.append('tipoId', filters.tipoId);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());

      const data: Response<ResponseConsulta[]> = res.data;

      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });

      return data.data;
    },
    dependencies: [filters],
  });

  return (
    <Table
      {...metadata}
      initialData={data}
      data={queryData}
      onChangePage={(page) => {
        setFilter('page', page.toString());
      }}
      value={Number(filters.page) || 1}
      columns={[
        {
          header: 'ID',
          cell: ({ row }) => {
            return <span>{row.consultaId}</span>;
          },
        },
        {
          header: 'Asunto',
          cell: ({ row }) => {
            return <span>{row.asunto}</span>;
          },
        },
        {
          header: 'Módulo',
          cell: ({ row }) => {
            return (
              <span className="text-ob-white flex items-center gap-x-2">
                <LuLayers size={18} />
                {row.modulo.nombre}
              </span>
            );
          },
        },
        {
          header: 'TipoConsulta',
          cell: ({ row }) => {
            return <span>{row.tipo.nombre}</span>;
          },
        },
        {
          header: 'Prioridad',
          cell: ({ row }) => {
            return <Badge className="bg-ob-blue-3 text-ob-lightblue">{row.prioridad.nombre}</Badge>;
          },
        },
        {
          header: 'Acciones',
          cell: () => {
            return (
              <ButtonModal
                className="bg-ob-blue-3 text-ob-lightblue py-1.5"
                modal={<EditarEstado />}
              >
                <FaRegDotCircle size={18} />
                Editar Estado
              </ButtonModal>
            );
          },
        },
      ]}
    />
  );
}
