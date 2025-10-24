'use client';

import { useAuth } from '@/components/context/AuthContext';
import HeaderCms from '@/components/layout/cms/header/HeaderCms';
import Badge from '@/components/ui/badge/Badge';
import ButtonGalery from '@/components/ui/button-galery/ButtonGalery';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/Textarea';
import { env } from '@/config/env';
import { useDrop } from '@/hooks/useDrop';
import { ResponseBlogCategoria } from '@/interface/response.interface';
import cx from '@/libs/cx';
import { parseDate } from '@/libs/parseDate';
import ListForm from '@/modules/cms/blog/form/ListForm';
import TextForm from '@/modules/cms/blog/form/TextForm';
import { CreateBlogSchema } from '@/schemas/cms/blog/Blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { LuArrowLeft, LuFile, LuSave, LuUpload } from 'react-icons/lu';
import * as LuIcons from 'react-icons/lu';

interface CreateBlogForm {
  categories: ResponseBlogCategoria[];
}

export default function MainSection({ categories }: CreateBlogForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(CreateBlogSchema),
  });

  const { user } = useAuth();

  const { divProps, inputProps, onClickInput, isOver } = useDrop({
    onDrop: (files) => {
      const file = files[0];
      if (file) {
        setValue('image.file', file);
        setValue('image.selected', undefined);
      }
    },
  });

  const imageWatch = watch('image');
  const categoriesWatch = watch('categories', []);

  console.log(user);

  const onClickCategory = (categoryId: number) => {
    const exists = categoriesWatch.findIndex((cat) => cat === categoryId);
    if (exists === -1) {
      setValue('categories', [...categoriesWatch, categoryId]);
    } else {
      setValue(
        'categories',
        categoriesWatch.filter((cat) => cat !== categoryId),
      );
    }
  };

  return (
    <form>
      <HeaderCms title="Crear Blog">
        <section className="flex items-center gap-x-2">
          <ButtonLink
            href="/cms/blog"
            className="border-ob-gray-4 border dark:bg-transparent dark:text-white"
          >
            <LuArrowLeft className="size-4" />
            Volver
          </ButtonLink>

          <Button className="dark:text-white">
            <LuSave className="size-4" />
            Guardar
          </Button>
        </section>
      </HeaderCms>

      <section className="grid grid-cols-2 gap-4 p-4">
        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Contenido</span>
            <span className="text-ob-gray-2">Ingresa el contenido del blog</span>
          </div>

          <Input
            label="Titulo"
            id="blogTitle"
            placeholder="Ingrese el titulo del blog"
            {...register('title')}
            error={errors.title?.message}
          />
          <TextArea
            label="Descripcion"
            id="blogDescription"
            placeholder="Ingrese la descripcion del blog"
            {...register('description')}
            error={errors.description?.message}
          />
          <Input
            label="Leyenda"
            id="blogCaption"
            placeholder="Ingrese la leyenda de la imagen"
            {...register('legend')}
            error={errors.legend?.message}
          />
        </InfoContainer>

        <InfoContainer className="relative" {...divProps}>
          <input {...inputProps} />

          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Imagen Principal</span>
            <span className="text-ob-gray-2">Ingresa la imagen principal del blog</span>
          </div>
          <Image
            src={
              imageWatch?.selected
                ? `${env.api_images}${imageWatch.selected.url}`
                : imageWatch?.file
                  ? URL.createObjectURL(imageWatch.file)
                  : '/template_file.png'
            }
            alt="file"
            width={294}
            height={160}
            className="max-h-[260px] w-full rounded-xl object-cover"
          />

          <div className="flex w-full items-center gap-x-2">
            <Button
              type="button"
              className="dark:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClickInput();
              }}
            >
              <LuUpload className="size-4" />
              Subir
            </Button>
            <ButtonGalery
              type="button"
              className="border-ob-gray-4 border-2 bg-transparent dark:bg-transparent dark:text-white"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onSelect={(r) => {
                setValue('image.selected', { url: r.url, id: r.recursoId });
                setValue('image.file', undefined);
              }}
              valueId={watch('image.selected')?.id}
            >
              <LuFile className="size-4" />
              Seleccionar
            </ButtonGalery>
          </div>

          {isOver && (
            <div className="absolute top-0 right-0 flex h-full w-full flex-1 items-center justify-center p-4">
              <span className="border-ob-gray-4 flex h-full w-full items-center justify-center rounded-2xl border border-dashed bg-white/90 text-black">
                Suelta el archivo para subir la imagen
              </span>
            </div>
          )}
        </InfoContainer>

        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Categorias</span>
            <span className="text-ob-gray-2">Selecciona una o varias categorias</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((category) => {
              const Icon = LuIcons[category.iconName as keyof typeof LuIcons];
              const finded = categoriesWatch.find((cat) => cat === category.blogCategoryId);
              console.log('finded', finded);
              return (
                <Badge
                  key={category.blogCategoryId}
                  className={cx(
                    'border-ob-gray-4 hover:bg-ob-blue flex cursor-pointer items-center border dark:bg-transparent dark:text-white',
                    finded && 'dark:bg-ob-blue',
                  )}
                  onClick={() => onClickCategory(category.blogCategoryId)}
                >
                  <Icon className="mr-2 size-4" />
                  {category.name}
                </Badge>
              );
            })}
          </div>
        </InfoContainer>

        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Autor y fecha</span>
          </div>

          <div className="flex flex-col gap-y-2">
            <span className="text-xs font-semibold">Autor</span>
            <article className="border-ob-gray-4 flex items-center rounded-xl border p-2">
              {user ? (
                <Image
                  src={`${env.api_images}${user?.recurso.url}` || '/template_user.png'}
                  alt={user?.personal.nombre || 'Autor'}
                  width={28}
                  height={28}
                  className="rounded-xl"
                />
              ) : (
                <span className="bg-ob-gray-4 block size-[28px] animate-pulse rounded-xl" />
              )}

              <span className="ml-2 text-sm">{user?.personal.nombre || 'Autor del blog'}</span>
            </article>
          </div>

          <div className="flex flex-col gap-y-2">
            <span className="text-xs font-semibold">Fecha de creación</span>
            <span className="border-ob-gray-4 rounded-xl border p-2">
              {parseDate(new Date().toISOString())}
            </span>
          </div>
        </InfoContainer>

        <InfoContainer className="col-span-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Componentes</span>
            <span className="text-ob-gray-2">Selecciona por lo menos un componente</span>
          </div>

          <TextForm />
          <ListForm />
        </InfoContainer>
      </section>
    </form>
  );
}
