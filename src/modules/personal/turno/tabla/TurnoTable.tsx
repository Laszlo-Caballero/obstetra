'use client';
import cx from '@/libs/cx';
import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import Table from '@/components/ui/table/Table';
import { useModal } from '@/hooks/useModal';
import { ResponseTurno } from '@/interface/response.interface';
import { AnimatePresence } from 'motion/react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import UpdateTurno from '../update-modal/UpdateTurno';
import DeleteTurno from '../delete-modal/DeleteTurno';

interface TurnoTableProps {
  data: ResponseTurno[];
}

export default function TurnoTable({ data }: TurnoTableProps) {
  const updateModal = useModal(-1);
  const deleteModal = useModal(-1);

  return (
    <>
      <Table
        initialData={data}
        disableFooter
        columns={[
          {
            header: 'ID',
            accessorKey: 'turnoId',
          },
          {
            header: 'Hora Inicio',
            accessorKey: 'horaInicio',
          },
          {
            header: 'Hora Fin',
            accessorKey: 'horaFin',
          },
          {
            header: 'Estado',
            cell: ({ row }) => (
              <Badge className={cx('text-white', row.estado ? 'bg-ob-green' : 'bg-ob-red')}>
                {row.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            ),
          },
          {
            header: 'Acciones',
            cell: ({ row }) => {
              return (
                <div className="flex gap-2">
                  <Button
                    className="text-ob-lightblue bg-ob-blue-3"
                    onClick={() => {
                      updateModal.openModal(row.turnoId);
                    }}
                  >
                    <TbEdit className="size-[18px]" />
                    Editar
                  </Button>
                  <Button
                    className="border-ob-white-3 dark:border-ob-gray border bg-transparent text-red-400"
                    onClick={() => {
                      deleteModal.openModal(row.turnoId);
                    }}
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

      <AnimatePresence>
        {updateModal.isOpen && (
          <UpdateTurno onClose={updateModal.closeModal} turnoId={updateModal.id} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal.isOpen && (
          <DeleteTurno onClose={deleteModal.closeModal} turnoId={deleteModal.id} />
        )}
      </AnimatePresence>
    </>
  );
}
