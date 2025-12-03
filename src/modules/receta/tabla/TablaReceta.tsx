'use client';
import { ResponseReceta } from '@/interface/response.interface';
import { LuFileText, LuEye } from 'react-icons/lu';
import Button from '@/components/ui/button/Button';
import { parseDate } from '@/libs/parseDate';
import Table from '@/components/ui/table/Table';
import { useState } from 'react';
import ModalDetalleReceta from '../modal/ModalDetalleReceta';
import { AnimatePresence } from 'motion/react';

interface TablaRecetaProps {
  data: ResponseReceta[];
}

export default function TablaReceta({ data }: TablaRecetaProps) {
  const [selectedRecetaId, setSelectedRecetaId] = useState<number | null>(null);

  return (
    <>
      <Table
        initialData={data}
        disableFooter={false}
        columns={[
          {
            header: 'ID',
            accessorKey: 'recetaId',
            cell: ({ row }) => <span className="text-ob-gray-2">RX-{row.recetaId}</span>,
          },
          {
            header: 'Fármaco / Detalle',
            accessorKey: 'detalle',
            cell: ({ row }) => <span className="text-ob-white font-medium">{row.detalle}</span>,
          },
          {
            header: 'Obstetra',
            cell: ({ row }) => (
              <span className="text-ob-gray-2">
                {row.cita.personal.nombre} {row.cita.personal.apellidoPaterno}
              </span>
            ),
          },
          {
            header: 'Fecha',
            cell: ({ row }) => <span className="text-ob-gray-2">{parseDate(row.cita.fecha)}</span>,
          },
          {
            header: 'Acciones',
            cell: ({ row }) => (
              <div className="flex items-center gap-x-2">
                <Button
                  className="bg-ob-teal-opacity text-ob-teal hover:bg-ob-teal hover:text-ob-black h-8 px-3 text-xs"
                  onClick={() => setSelectedRecetaId(row.recetaId)}
                >
                  <LuEye className="mr-1.5" />
                  Ver
                </Button>
                <Button className="border-ob-gray-2 text-ob-gray-2 hover:border-ob-white hover:text-ob-white h-8 border bg-transparent px-3 text-xs">
                  <LuFileText className="mr-1.5" />
                  PDF
                </Button>
              </div>
            ),
          },
        ]}
      />
      <AnimatePresence>
        {selectedRecetaId && (
          <ModalDetalleReceta
            recetaId={selectedRecetaId}
            onClose={() => setSelectedRecetaId(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
