'use client';
import React from 'react';
import { useQuery } from '@/hooks/useQuery';
import { Response, Tipo } from '@/interface/response.interface';
import axios from 'axios';
import Table from '@/components/ui/table-without-context/Table';
import { FaLaptopMedical } from 'react-icons/fa';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import { MdModeEdit } from 'react-icons/md';

export default function TablaTipo() {
  const { data: queryData } = useQuery<Tipo[]>({
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/ayuda/tipo-consulta`);

      const res = await axios.get(parseUrl.toString());

      const data: Response<Tipo[]> = res.data;
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
                <FaLaptopMedical size={18} />
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
              <Button className="bg-ob-blue-2 text-ob-lightblue py-1.5" type="button">
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
