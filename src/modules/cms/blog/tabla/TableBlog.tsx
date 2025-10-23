'use client';
import { useFilter } from '@/components/context/FilterContext';
import { ResponseBlog, StatusType } from '@/interface/blog-response.interface';
import { FilterInterface } from '../fliters/filter.interface';
import { useQuery } from '@/hooks/useQuery';
import { Response } from '@/interface/response.interface';
import axios from 'axios';
import { useAuth } from '@/components/context/AuthContext';
import Table from '@/components/ui/table/Table';
import Badge from '@/components/ui/badge/Badge';
import Image from 'next/image';
import { env } from '@/config/env';
import { parseDate } from '@/libs/parseDate';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import { TbEdit, TbTrash } from 'react-icons/tb';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import StatusBadge from '../StatusBadge';

interface TableBlogProps {
  data: ResponseBlog[];
  total?: number;
  totalPage?: number;
  limit?: number;
}
export default function TableBlog({ data, ...props }: TableBlogProps) {
  const { filters, setFilter, setMetadata, metadata } = useFilter<FilterInterface>();

  const { token, user } = useAuth();

  const { data: queryData } = useQuery<Response<ResponseBlog[]>>({
    queryFn: async (url) => {
      const parseUrl = new URL(`${url}/blog`);

      parseUrl.searchParams.append('limit', props.limit?.toString() || '10');
      parseUrl.searchParams.append('page', filters.page.toString());

      if (filters.status != '') {
        parseUrl.searchParams.append('status', filters.status);
      }
      if (filters.categorySlug != '') {
        parseUrl.searchParams.append('categorySlug', filters.categorySlug);
      }
      if (filters.search != '') {
        parseUrl.searchParams.append('search', filters.search);
      }

      const res = await axios.get(parseUrl.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: Response<ResponseBlog[]> = res.data;
      setMetadata({
        total: data?.metadata?.totalItems || 0,
        totalPage: data?.metadata?.totalPages || 0,
        limit: 10,
      });
      return data;
    },
    dependencies: [filters],
    firstRender: false,
  });

  return (
    <Table
      metadata={metadata}
      initialMetadata={{
        total: props.total || 0,
        totalPage: props.totalPage || 0,
        limit: props.limit || 10,
      }}
      value={filters.page}
      onChangePage={(page) => {
        setFilter('page', page);
      }}
      initialData={data}
      data={queryData?.data}
      columns={[
        {
          header: 'ID',
          accessorKey: 'blogId',
        },
        {
          header: 'Slug',
          cell: ({ row }) => {
            const slug = row.slug;
            return (
              <span className="block max-w-[150px] font-medium text-wrap break-words whitespace-break-spaces">
                {slug}
              </span>
            );
          },
        },
        {
          header: 'Título',
          cell: ({ row }) => {
            const title = row.title;
            return (
              <span className="block max-w-[150px] font-medium text-wrap break-words whitespace-break-spaces">
                {title}
              </span>
            );
          },
        },
        {
          header: 'Descripción',
          cell: ({ row }) => {
            const description = row.description;
            return (
              <span className="block max-w-[150px] font-medium text-wrap break-words whitespace-break-spaces">
                {description}
              </span>
            );
          },
        },
        {
          header: 'Categorias',
          cell: ({ row }) => {
            const categories = row.category;
            console.log(categories);

            return (
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <Badge key={cat.blogCategoryId} className="border-ob-gray-4 border">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            );
          },
        },
        {
          header: 'Autor',
          cell: ({ row }) => {
            const author = row.user.personal;
            const recurso = row.user.recurso;

            return (
              <div className="flex items-center gap-2">
                <Image
                  src={env.api_images + recurso.url}
                  alt={author.nombre}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>
                  {author.nombre} {author.apellidoPaterno}
                </span>
              </div>
            );
          },
        },
        {
          header: 'Estado',
          cell: ({ row }) => {
            return <StatusBadge status={row.status} />;
          },
        },
        {
          header: 'Fecha de Creación',
          cell: ({ row }) => {
            const date = parseDate(row.createdAt);
            return <span>{date}</span>;
          },
        },
        {
          header: 'Acciones',
          cell: ({ row }) => {
            return (
              <div className="flex gap-2">
                <ButtonLink
                  href={`/blog/editar/${row?.blogId}`}
                  className="dark:text-ob-lightblue dark:bg-ob-black-2 w-1/2"
                >
                  <TbEdit className="size-[18px]" />
                  Editar
                </ButtonLink>
                <ButtonModal
                  modal={<></>}
                  className="border-ob-gray w-1/2 border dark:bg-transparent dark:text-red-400"
                >
                  <TbTrash className="size-[18px]" />
                  Eliminar
                </ButtonModal>
                {user?.role.roleName === 'Administrador' && row.status === StatusType.DRAFT && (
                  <ButtonModal modal={<></>}>Publicar</ButtonModal>
                )}
              </div>
            );
          },
        },
      ]}
    />
  );
}
