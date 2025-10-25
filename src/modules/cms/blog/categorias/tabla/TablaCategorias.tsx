'use client';
import Button from '@/components/ui/button/Button';
import Table from '@/components/ui/table/Table';
import { useQuery } from '@/hooks/useQuery';
import { Response, ResponseBlogCategoria } from '@/interface/response.interface';
import axios from 'axios';
import { AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import * as Icon from 'react-icons/lu';
import { TbEdit, TbTrash } from 'react-icons/tb';
import ModalUpdateCategory from '../modal-update/ModalUpdate';
import ModalDelete from '../modal-delete/ModalDelete';

export default function TablaCategorias({ data }: { data: ResponseBlogCategoria[] }) {
  const { data: queryData } = useQuery<ResponseBlogCategoria[]>({
    firstRender: false,
    queryFn: async (url) => {
      const res = await axios.get(`${url}/blog-category`);

      const data: Response<ResponseBlogCategoria[]> = res.data;

      return data.data;
    },
  });
  const [showUpdateModal, setShowUpdateModal] = useState({
    isOpen: false,
    idCategory: -1,
  });

  const [showDeleteModal, setShowDeleteModal] = useState({
    isOpen: false,
    idCategory: -1,
  });

  return (
    <>
      <Table
        initialData={data}
        data={queryData}
        disableFooter
        columns={[
          {
            header: 'ID',
            accessorKey: 'blogCategoryId',
          },
          {
            header: 'Icono',
            cell: ({ row }) => {
              const IconName = row.iconName as keyof typeof Icon;
              const IconComponent = Icon[IconName];
              return <IconComponent className="text-ob-black-4 size-4 dark:text-white" />;
            },
          },
          {
            header: 'Nombre',
            accessorKey: 'name',
          },
          {
            header: 'Slug',
            accessorKey: 'slug',
          },

          {
            header: 'Acciones',
            cell: ({ row }) => {
              return (
                <div className="flex gap-2">
                  <Button
                    //   href={`/posta/editar/${row.postaId}`}
                    className="text-ob-lightblue bg-ob-black-2"
                    onClick={() =>
                      setShowUpdateModal({ isOpen: true, idCategory: row.blogCategoryId })
                    }
                  >
                    <TbEdit className="size-[18px]" />
                    Editar
                  </Button>
                  <Button
                    //   href={`/posta/${row.dni}/delete`}
                    className="border-ob-gray border bg-transparent text-red-400"
                    onClick={() =>
                      setShowDeleteModal({ isOpen: true, idCategory: row.blogCategoryId })
                    }
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
        {showUpdateModal.isOpen && (
          <ModalUpdateCategory
            onClose={() => {
              setShowUpdateModal({
                isOpen: false,
                idCategory: -1,
              });
            }}
            idCategory={showUpdateModal.idCategory}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal.isOpen && (
          <ModalDelete
            idCategory={showDeleteModal.idCategory.toString()}
            onClose={() =>
              setShowDeleteModal({
                isOpen: false,
                idCategory: -1,
              })
            }
          />
        )}
      </AnimatePresence>
    </>
  );
}
