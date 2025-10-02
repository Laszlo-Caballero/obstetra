'use client';
import { useFilter } from '@/components/context/FilterContext';
import { Response, ResponsePresentacion } from '@/interface/response.interface';
import { FilterPresentacion } from '../types';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import Table from '@/components/ui/table/Table';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { TbEdit, TbTrash } from 'react-icons/tb';

interface TabalaPresentacionProps {
  data: ResponsePresentacion[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaPresentacion({ data, ...props }: TabalaPresentacionProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FilterPresentacion>();
  const { data: queryData } = useQuery<Response<ResponsePresentacion[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/farmacia/presentacion`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page.toString() || '1');
      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }
      const res = await axios.get(parseUrl.toString());

      const data: Response<ResponsePresentacion[]> = res.data;
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
          header: 'Nombre',
          accessorKey: 'nombre',
        },
        {
          header: 'Estado',
          cell({ row }) {
            return row.estado ? <Badge>Activo</Badge> : <Badge>Inactivo</Badge>;
          },
        },
        {
          header: 'Acciones',
          cell({ row }) {
            return (
              <div className="flex gap-2">
                <Button
                  //   href={`/posta/editar/${row.postaId}`}
                  className="text-ob-lightblue bg-ob-black-2 w-1/2"
                >
                  <TbEdit className="size-[18px]" />
                  Editar
                </Button>
                <Button
                  //   href={`/posta/${row.dni}/delete`}
                  className="border-ob-gray w-1/2 border bg-transparent text-red-400"
                >
                  <TbTrash className="size-[18px]" />
                  Eliminar
                </Button>
              </div>
            );
          },
        },
      ]}
    />
  );
}
