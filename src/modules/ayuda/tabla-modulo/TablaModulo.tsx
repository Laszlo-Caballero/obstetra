'use client';
import React from 'react';
import axios from 'axios';

import Table from '@/components/ui/table-without-context/Table';
import Button from '@/components/ui/button/Button';

import { Response, Modulo } from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import { LuLayers } from 'react-icons/lu';
import { MdModeEdit } from 'react-icons/md';
import Badge from '@/components/ui/badge/Badge';

export default function TablaModulo() {
  const { data: queryData } = useQuery<Modulo[]>({
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/ayuda/modulo`);

      const res = await axios.get(parseUrl.toString());

      const data: Response<Modulo[]> = res.data;
      return data.data;
    },
  });

  return (
    <Table
      initialData={queryData || []}
      data={queryData}
      columns={[
        {
          header: 'Nombre',
          cell: ({ row }) => {
            return (
              <span className="text-ob-white flex items-center gap-x-2">
                <LuLayers size={18} />
                {row.nombre}
              </span>
            );
          },
        },
        {
          header: 'Descripcion',
          cell: ({ row }) => {
            return <span className="text-ob-white">{row.descripcion}</span>;
          },
        },
        {
          header: 'Estado',
          cell: ({ row }) => {
            return (
              <Badge
                className={`text-sm ${
                  row.estado ? 'bg-ob-blue-2 text-ob-lightblue' : 'bg-ob-red text-ob-white'
                }`}
              >
                {row.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            );
          },
        },
        {
          header: 'Acciones',
          cell: () => {
            return (
              <Button className="bg-ob-blue-2 text-ob-lightblue py-1.5">
                <MdModeEdit size={18} />
                Renombrar
              </Button>
            );
          },
        },
      ]}
    />
  );
}
