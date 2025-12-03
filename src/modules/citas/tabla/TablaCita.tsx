'use client';
import { Response, ResponseCita } from '@/interface/response.interface';
import Table from '@/components/ui/table/Table';
import { parseDate } from '@/libs/parseDate';
import Badge from '@/components/ui/badge/Badge';
import cx from '@/libs/cx';
import Button from '@/components/ui/button/Button';
import { LuTrash2, LuEye } from 'react-icons/lu';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import ModalEliminarCita from '../modal/ModalEliminarCita';
import { useFilter } from '@/components/context/FilterContext';
import { FiltersCitas } from '../type';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import { useTableContext } from '@/components/context/TableContext';

interface TablaCitaProps {
  data: ResponseCita[];
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function TablaCita({ data, ...props }: TablaCitaProps) {
  const [selectedCita, setSelectedCita] = useState<ResponseCita | null>(null);
  const { filters, setFilter, setMetadata, metadata } = useFilter<FiltersCitas>();
  const { refresh } = useTableContext<ResponseCita>();

  const { data: queryData } = useQuery<Response<ResponseCita[]>>({
    firstRender: false,
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/cita`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '12');
      parseUrl.searchParams.append('page', filters.page);

      if (filters.status != '') {
        parseUrl.searchParams.append('status', filters.status);
      }

      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString());
      const data: Response<ResponseCita[]> = res.data;
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 12,
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
          limit: props.limit || 12,
        }}
        value={Number(filters.page) || 1}
        onChangePage={(page) => {
          setFilter('page', page.toString());
        }}
        initialData={data}
        data={queryData?.data}
        disableFooter={false}
        columns={[
          {
            header: 'ID',
            accessorKey: 'citaId',
            cell: ({ row }) => <span className="text-ob-gray-2">#A-{row.citaId}</span>,
          },
          {
            header: 'Paciente',
            cell: ({ row }) => (
              <div className="flex flex-col">
                <span className="text-ob-white font-medium">
                  {row.paciente.nombres} {row.paciente.apellido_paterno}
                </span>
                <span className="text-ob-gray-2 text-xs">{row.paciente.dni}</span>
              </div>
            ),
          },
          {
            header: 'Obstetra',
            cell: ({ row }) => (
              <span className="text-ob-gray-2">Dra. {row.personal.apellidoPaterno}</span>
            ),
          },
          {
            header: 'Fecha y Hora',
            cell: ({ row }) => (
              <div className="flex flex-col">
                <span className="text-ob-white text-sm">{parseDate(row.fecha)}</span>
                <span className="text-ob-gray-2 text-xs">
                  {row.turno.horaInicio} - {row.turno.horaFin}
                </span>
              </div>
            ),
          },
          {
            header: 'Estado',
            cell: ({ row }) => {
              const statusColors: Record<string, string> = {
                pendiente: 'bg-ob-yellow text-white',
                completado: 'bg-ob-green text-white',
                cancelado: 'bg-ob-red text-white',
              };
              const colorClass = statusColors[row.estado] || 'bg-ob-gray-2 text-white';

              return <Badge className={cx('capitalize', colorClass)}>{row.estado}</Badge>;
            },
          },
          {
            header: 'Acciones',
            cell: ({ row }) => (
              <div className="flex items-center gap-x-2">
                <Button className="bg-ob-teal-opacity text-ob-teal hover:bg-ob-teal hover:text-ob-black h-8 px-3 text-xs">
                  <LuEye className="mr-1.5" />
                  Ver
                </Button>
                <Button
                  className="border-ob-gray-2 text-ob-gray-2 h-8 border bg-transparent px-3 text-xs hover:border-red-500 hover:text-red-500"
                  onClick={() => setSelectedCita(row)}
                >
                  <LuTrash2 className="mr-1.5" />
                  Eliminar
                </Button>
              </div>
            ),
          },
        ]}
      />
      <AnimatePresence>
        {selectedCita && (
          <ModalEliminarCita
            cita={selectedCita}
            onClose={() => setSelectedCita(null)}
            onSuccess={(data) => {
              setSelectedCita(null);
              refresh(data.data);
              setMetadata({
                total: data?.metadata?.totalItems || 0,
                totalPage: data?.metadata?.totalPages || 0,
                limit: 12,
              });
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
