'use client';

import cx from '@/libs/cx';

import Badge from '@/components/ui/badge/Badge';
import Button from '@/components/ui/button/Button';
import Table from '@/components/ui/table/Table';
import { useModal } from '@/hooks/useModal';
import { ResponseTipoPersonal } from '@/interface/response.interface';
import { AnimatePresence } from 'motion/react';
import { TbEdit, TbTrash } from 'react-icons/tb';
import UpdateTipoPersonal from '../modal-update/UpdateTipoPersonal';
import DeleteTipoPersonal from '../modal-delete/DeleteTipoPersonal';

export default function TablaTipoPersonal({ data }: { data: ResponseTipoPersonal[] }) {
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
            accessorKey: 'tipoPersonalId',
          },
          {
            header: 'Nombre',
            accessorKey: 'nombre',
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
                      updateModal.openModal(row.tipoPersonalId);
                    }}
                  >
                    <TbEdit className="size-[18px]" />
                    Editar
                  </Button>
                  <Button
                    className="border-ob-white-3 dark:border-ob-gray border bg-transparent text-red-400"
                    onClick={() => {
                      deleteModal.openModal(row.tipoPersonalId);
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
          <UpdateTipoPersonal onClose={updateModal.closeModal} idTipoPersonal={updateModal.id} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModal.isOpen && (
          <DeleteTipoPersonal onClose={deleteModal.closeModal} idTipoPersonal={deleteModal.id} />
        )}
      </AnimatePresence>
    </>
  );
}
