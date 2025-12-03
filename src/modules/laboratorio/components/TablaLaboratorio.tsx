'use client';

import { ResponsePruebaLaboratorio } from '@/interface/response.interface';
import Table from '@/components/ui/table/Table';
import Button from '@/components/ui/button/Button';

interface TablaLaboratorioProps {
  data: ResponsePruebaLaboratorio[];
}

export default function TablaLaboratorio({ data }: TablaLaboratorioProps) {
  return (
    <Table
      initialData={data}
      disableFooter={false}
      columns={[
        {
          header: 'Paciente',
          cell: ({ row }) => (
            <div className="flex flex-col">
              <span className="text-ob-white font-medium">
                Paciente {row.cita[0]?.paciente.nombres}
              </span>
              <span className="text-ob-gray-2 text-sm">DNI: {row.cita[0]?.paciente.dni}</span>
            </div>
          ),
        },
        {
          header: 'Orden',
          cell: ({ row }) => (
            <span className="text-ob-white">
              ORD-2025-{row.pruebaId.toString().padStart(4, '0')}
            </span>
          ),
        },
        {
          header: 'Tipo de prueba',
          cell: ({ row }) => <span className="text-ob-white font-medium">{row.nombre}</span>,
        },
        {
          header: 'Fecha toma',
          cell: ({ row }) => {
            const date = new Date(row.fechaCreacion);
            return <span className="text-ob-gray-2">{date.toLocaleDateString()}</span>;
          },
        },
        {
          header: 'Estado',
          cell: ({ row }) => {
            const estado = row.estado;
            let colorClass = 'bg-ob-gray-4 text-ob-gray-2';
            if (estado === 'Pendiente') colorClass = 'bg-ob-orange/10 text-ob-orange';
            if (estado === 'Validado') colorClass = 'bg-ob-teal/10 text-ob-teal';
            if (estado === 'Observado') colorClass = 'bg-ob-red-5/10 text-ob-red-5';

            return (
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${colorClass}`}>
                {estado}
              </span>
            );
          },
        },
        {
          header: 'Responsable',
          cell: ({ row }) => {
            const citas = row.cita;
            const personal = citas && citas.length > 0 ? citas[0].personal : null;
            return (
              <span className="text-ob-gray-2">
                {personal ? `${personal.nombre} ${personal.apellidoPaterno}` : 'Sin asignar'}
              </span>
            );
          },
        },
        {
          header: 'Acciones',
          cell: () => (
            <div className="flex gap-2">
              <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border px-3 py-1 text-xs">
                Ver detalle
              </Button>
              <Button className="bg-ob-teal text-ob-black-4 px-3 py-1 text-xs">
                Completar datos
              </Button>
            </div>
          ),
        },
      ]}
    />
  );
}
