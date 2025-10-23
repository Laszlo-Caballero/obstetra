import HeaderCms from '@/components/layout/cms/header/HeaderCms';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import { ResponseBlog } from '@/interface/blog-response.interface';
import { ResponseBlogCategoria } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import FilterCategory from '@/modules/cms/blog/fliters/FilterCategory';
import FilterStatus from '@/modules/cms/blog/fliters/FilterStatus';
import SearchFilter from '@/modules/cms/blog/fliters/SearchFilter';
import TableBlog from '@/modules/cms/blog/tabla/TableBlog';
import { getToken } from '@/utils/getToken';
import React from 'react';
import { LuPlus } from 'react-icons/lu';

export default async function BlogPage() {
  const token = await getToken();

  const res = await fetcher<ResponseBlog[]>('/blog?limit=10&page=1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const resCategories = await fetcher<ResponseBlogCategoria[]>('blog-category', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <main className="flex h-full flex-col">
      <HeaderCms title="Blogs - Administracion">
        <section className="flex items-center gap-x-2">
          <ButtonLink href="blog/crear" className="border-ob-gray-4 bg-ob-blue border text-white">
            <LuPlus className="size-4" />
            Nuevo Blog
          </ButtonLink>
        </section>
      </HeaderCms>
      <div className="flex flex-col gap-y-4 p-4">
        <section className="flex items-center gap-2">
          <SearchFilter />
          <FilterCategory categories={resCategories?.data || []} />
          <FilterStatus />
        </section>

        <TableBlog
          data={res?.data || []}
          total={res?.metadata?.totalItems || 0}
          totalPage={res?.metadata?.totalPages || 0}
          limit={10}
        />
      </div>
    </main>
  );
}
