'use client';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import TextArea from '@/components/ui/textarea/Textarea';
import CheckBox from '@/components/ui/checkbox/CheckBox';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { GoHome } from 'react-icons/go';
import { LuArrowLeft, LuCheck, LuPill, LuSave, LuImageUp } from 'react-icons/lu';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import {
  Response,
  ResponseCategoria,
  ResponseMedicina,
  ResponsePresentacion,
} from '@/interface/response.interface';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MedicinaSchema, MedicinaSchemaType } from '@/schemas/medicina/medicina.schema';
import { useDrop } from '@/hooks/useDrop';
import Image from 'next/image';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { Recurso } from '@/interface/auth.interface';
import { notify } from '@/libs/toast';
import { env } from '@/config/env';
import { useRouter } from 'next/navigation';

interface EditMedicinaProps {
  categorias: ResponseCategoria[];
  presentaciones: ResponsePresentacion[];
  preloadedData: ResponseMedicina;
}

export default function EditMedicina({
  categorias,
  presentaciones,
  preloadedData,
}: EditMedicinaProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(MedicinaSchema),
    defaultValues: {
      nombre: preloadedData.nombre,
      categoria: {
        label: preloadedData.categoria.nombre,
        value: preloadedData.categoria.categoriaId.toString(),
      },
      codigo: preloadedData.codigo,
      descripcion: preloadedData.descripcion,
      unidades: preloadedData.unidades,
      dosis: preloadedData.dosis,
      stock: preloadedData.stock,
      stockMinimo: preloadedData.stockMinimo,
      necesitaReceta: preloadedData.necesitaReceta,
      presentacion: {
        label: preloadedData.presentacion.nombre,
        value: preloadedData.presentacion.presentacionId.toString(),
      },
      foto: new File([], ''),
    },
  });

  const defaultImage = `${env.api_images}${preloadedData.recurso?.url}`;
  const { divProps, inputProps } = useDrop({
    onDrop(file) {
      const fistFile = file[0];
      if (fistFile) {
        setValue('foto', fistFile);
      }
    },
  });

  const watchNecesitaReceta = watch('necesitaReceta', false);
  const watchCategoria = watch('categoria', { value: '', label: '' });
  const watchPresentacion = watch('presentacion', { value: '', label: '' });

  const { mutate } = useMutation<MedicinaSchemaType>({
    mutationFn: async (data, urlApi) => {
      const { foto, categoria, presentacion, ...medicamento } = data;

      let res = {
        data: {
          data: preloadedData.recurso,
          status: 200,
          message: 'OK',
        },
      };
      if (foto.size > 0) {
        const formData = new FormData();
        formData.append('file', foto);
        formData.append('destination', 'medicamentos');

        res = await axios.post(`${urlApi}/recurso/one`, formData);
      }

      const recursoData: Response<Recurso> = res.data;

      const parsedMedicamento = {
        ...medicamento,
        recursoId: recursoData.data.recursoId,
        categoriaId: parseInt(categoria.value),
        presentacionId: parseInt(presentacion.value),
      };
      return axios.patch(
        `${urlApi}/farmacia/medicina/${preloadedData.medicinaId}`,
        parsedMedicamento,
      );
    },
    onSuccess: () => {
      notify.success({
        message: 'Medicina actualizada con éxito',
      });
      router.push('/medicina');
    },
    onError: () => {
      notify.error({
        message: 'Error al actualizar la medicina',
      });
    },
  });

  return (
    <div className="flex w-full flex-col gap-y-4 p-5 font-medium">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Medicina',
            href: '/medicina',
            icon: <LuPill />,
          },
          {
            title: 'Editar Medicina',
            href: '/medicina/editar',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Editar Medicina"
          description="Edita la información de la medicina seleccionada"
          icon={<LuPill size={18} />}
        />
        <div className="flex items-center gap-x-2">
          <ButtonLink className="border-ob-gray text-ob-white border" href="/medicina">
            <LuArrowLeft size={18} />
            Volver
          </ButtonLink>
          <Button className="text-ob-black bg-ob-teal">
            <LuSave size={18} />
            Guardar
          </Button>
        </div>
      </section>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit((data) => mutate(data))}>
        {/* Formulario 1 */}

        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Información Básica</span>
            <span className="text-ob-gray-2">Ingresa la data de la medicina</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-y-1.5">
              <Input
                label="Nombre de la medicina"
                id="name"
                placeholder="EJ. Paracetamol 500mg"
                className={{ label: 'text-ob-white text-sm' }}
                {...register('nombre')}
                error={errors.nombre?.message}
              />
              <span className="text-ob-gray-2 text-xs">
                Nombre comercial o genérico con la dosis
              </span>
            </div>
            <Input
              label="Código / SKU"
              id="sku"
              placeholder="EJ. 123456"
              className={{ label: 'text-ob-white text-sm' }}
              {...register('codigo')}
              error={errors.codigo?.message}
            />
            <Select
              placeholder="Seleccionar Categoría"
              label="Categoría"
              className={{ label: 'text-ob-white text-sm' }}
              options={categorias.map((categoria) => ({
                label: categoria.nombre,
                value: categoria.categoriaId.toString(),
              }))}
              onChange={(value) => setValue('categoria', value)}
              value={watchCategoria}
              error={errors.categoria?.message}
            />
            <Select
              placeholder="Seleccionar Presetación"
              label="Presentación"
              className={{ label: 'text-ob-white text-sm' }}
              options={presentaciones.map((presentacion) => ({
                label: presentacion.nombre,
                value: presentacion.presentacionId.toString(),
              }))}
              onChange={(value) => setValue('presentacion', value)}
              value={watchPresentacion}
              error={errors.presentacion?.message}
            />
            <div className="col-start-1 col-end-3">
              <TextArea
                label="Descripción"
                id="description"
                placeholder="Indicaciones, dosis y consideraciones"
                rows={5}
                className={{
                  label: 'text-ob-white text-sm',
                }}
                {...register('descripcion')}
                error={errors.descripcion?.message}
              />
            </div>
          </div>
        </InfoContainer>

        {/* Formulario 2 */}

        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Detalles y control</span>
            <span className="text-ob-gray-2">Configura unidades y alertas</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Unidad por empaque"
              id="unit"
              placeholder="EJ. 10 Tabletas"
              className={{ label: 'text-ob-white text-sm' }}
              {...register('unidades', { valueAsNumber: true })}
              error={errors.unidades?.message}
            />
            <Input
              label="Dosis (mg/ml)"
              id="dosis"
              placeholder="EJ. 500mg"
              className={{ label: 'text-ob-white text-sm' }}
              {...register('dosis')}
              error={errors.dosis?.message}
            />
            <Input
              label="Stock Inicial"
              id="initialStock"
              placeholder="20"
              className={{ label: 'text-ob-white text-sm' }}
              {...register('stock', { valueAsNumber: true })}
              error={errors.stock?.message}
            />
            <Input
              label="Stock Minimo"
              id="minStock"
              placeholder="30"
              className={{ label: 'text-ob-white text-sm' }}
              {...register('stockMinimo', { valueAsNumber: true })}
              error={errors.stockMinimo?.message}
            />
            <CheckBox
              label="Necesita Receta"
              onChange={(val) => setValue('necesitaReceta', val)}
              value={watchNecesitaReceta}
            >
              <span className="flex items-center gap-x-2">
                <LuCheck size={16} />
                Sí
              </span>
            </CheckBox>
          </div>
        </InfoContainer>
        <InfoContainer>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ob-white">Imagen</span>
          </div>
          <div
            {...divProps}
            className="bg-ob-black-4 border-ob-gray flex h-[132px] cursor-pointer items-center justify-center rounded-xl border border-dashed"
          >
            <input {...inputProps} />
            {watch('foto') || defaultImage ? (
              <Image
                src={
                  watch('foto') && watch('foto').size > 0
                    ? URL.createObjectURL(watch('foto'))
                    : defaultImage
                }
                alt="preview"
                width={100}
                height={100}
                className="h-full object-contain"
              />
            ) : (
              <span className="text-ob-gray-2 flex items-center gap-x-2">
                <LuImageUp size={22} />
                Subir o Arrastrar imagen del producto
              </span>
            )}
          </div>
          {errors.foto && <span className="text-sm text-red-500">{errors.foto.message}</span>}
        </InfoContainer>
        <div className="flex items-center justify-end gap-x-2">
          <Button className="border-ob-gray text-ob-white border bg-transparent">Cancelar</Button>
          <Button className="bg-ob-teal">
            <LuSave size={18} />
            Actualizar Medicina
          </Button>
        </div>
      </form>
    </div>
  );
}
