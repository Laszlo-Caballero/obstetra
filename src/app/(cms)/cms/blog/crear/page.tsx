'use client';

import HeaderCms from '@/components/layout/cms/header/HeaderCms';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import TextArea from '@/components/ui/textarea/Textarea';
import { useDrop } from '@/hooks/useDrop';
import { CreateBlogSchema } from '@/schemas/cms/blog/Blog.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuArrowLeft, LuSave } from 'react-icons/lu';

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(CreateBlogSchema),
  });

  const { divProps, inputProps, onClickInput, isOver } = useDrop({
    onDrop: (files) => {
      const file = files[0];
      if (file) {
        setValue('image.file', file);
      }
    },
  });

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

      <section className="flex gap-x-4 p-4">
        <InfoContainer className="w-1/2">
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

        <InfoContainer className="w-1/2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Imagen Principal</span>
            <span className="text-ob-gray-2">Ingresa la imagen principal del blog</span>
          </div>
        </InfoContainer>
      </section>
    </form>
  );
}
