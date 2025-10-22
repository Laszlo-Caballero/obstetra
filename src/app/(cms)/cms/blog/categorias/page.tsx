import HeaderCms from '@/components/layout/cms/header/HeaderCms';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Button from '@/components/ui/button/Button';
import { ResponseBlogCategoria } from '@/interface/response.interface';
import cx from '@/libs/cx';
import { fetcher } from '@/libs/fetch';
import ModalCreateCategory from '@/modules/cms/blog/categorias/modal-create/ModalCreateCategory';
import TablaCategorias from '@/modules/cms/blog/categorias/tabla/TablaCategorias';
import { cookies } from 'next/headers';
import React from 'react';
import { LuArrowLeft, LuPlus } from 'react-icons/lu';

export default async function CategoriasPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get('token')?.value || '';

  const res = await fetcher<ResponseBlogCategoria[]>('blog-category', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <main className="flex h-full flex-col">
      <HeaderCms title="Categorias-Blog">
        <section className="flex items-center gap-x-2">
          <Button
            className={cx(
              'border-ob-gray cursor-pointer rounded-md border bg-transparent px-3 py-2.5 text-white',
            )}
          >
            <LuArrowLeft className="size-4" />
            Volver al Blog
          </Button>
          <ButtonModal modal={<ModalCreateCategory />}>
            <LuPlus className="size-4" />
            Agregar categoría
          </ButtonModal>
        </section>
      </HeaderCms>

      <section className="p-4">
        <TablaCategorias data={res?.data || []} />
      </section>
    </main>
  );
}
