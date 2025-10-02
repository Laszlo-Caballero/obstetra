'use client';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Button from '@/components/ui/button/Button';
import InputDate from '@/components/ui/input-date/InputDate';
import Input from '@/components/ui/input/input';
import Mapa from '@/components/ui/map/Map';
import Select from '@/components/ui/select/Select';
import Title from '@/components/ui/title/Title';
import { useMutation } from '@/hooks/useMutation';
import {
  Response,
  ResponseDistrito,
  ResponsePosta,
  ResponseProvincia,
  ResponseRegion,
} from '@/interface/response.interface';
import { notify } from '@/libs/toast';
import { PostaSchema, PostaSchemaType } from '@/schemas/posta/posta.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { parse } from 'date-fns';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoHome } from 'react-icons/go';
import { LuBuilding2, LuSave } from 'react-icons/lu';
interface MainSectionProps {
  regiones: ResponseRegion[];
  defaultData: ResponsePosta;
}

export default function MainSection({ regiones, defaultData }: MainSectionProps) {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(PostaSchema),
    defaultValues: {
      capacidad: defaultData.capacidad || 0,
      altitud: Number(defaultData.altitud) || 0,
      direccion: defaultData.direccion || '',
      fechaInicioActividad:
        defaultData.fechaInicioActividad || new Date().toISOString().split('T')[0],
      distrito: {
        label: defaultData.distrito.nombre,
        value: defaultData.distrito.distritoId.toString(),
      },
      ipress: defaultData.ipress || '',
      lat: defaultData.lat || '',
      lng: defaultData.lng || '',
      nombre: defaultData.nombre || '',
      region: {
        label: defaultData.region.nombre,
        value: defaultData.region.regionId.toString(),
      },
      provincia: {
        label: defaultData.provincia.nombre,
        value: defaultData.provincia.provinciaId.toString(),
      },
      ruc: defaultData.ruc || '',
    },
  });

  const [enableProvincia, setEnableProvincia] = useState(false);
  const [enableDistrito, setEnableDistrito] = useState(false);

  const { mutate: getProvincias, data: resProvincia } = useMutation<
    { regionId: string },
    Response<ResponseProvincia[]>
  >({
    mutationFn: async (data, url) => {
      setEnableProvincia(false);
      const res = await axios.get(`${url}/utils/provincias/${data.regionId}`);
      return res.data;
    },
    onSuccess: () => {
      setEnableProvincia(true);
    },
    onError: () => {
      notify.error({
        message: 'Error al cargar las provincias',
      });
    },
    disableLoader: true,
  });

  const { mutate: getDistrito, data: resDistrito } = useMutation<
    { provinciaId: string },
    Response<ResponseDistrito[]>
  >({
    mutationFn: async (data, url) => {
      setEnableDistrito(false);
      const res = await axios.get(`${url}/utils/distritos/${data.provinciaId}`);
      return res.data;
    },
    onSuccess: () => {
      setEnableDistrito(true);
    },
    onError: () => {
      notify.error({
        message: 'Error al cargar las distritos',
      });
    },
    disableLoader: true,
  });

  useEffect(() => {
    if (defaultData.region) {
      getProvincias({ regionId: defaultData.region.regionId.toString() });
    }
    if (defaultData.provincia) {
      getDistrito({ provinciaId: defaultData.provincia.provinciaId.toString() });
    }
  }, [defaultData.provincia, defaultData.region]);

  const watchLat = watch('lat');
  const watchLng = watch('lng');
  const router = useRouter();

  const { mutate: createPosta } = useMutation<PostaSchemaType>({
    mutationFn: async (data, url) => {
      const { region, altitud, provincia, distrito, ...rest } = data;

      const res = await axios.patch(`${url}/posta/${defaultData.postaId}`, {
        ...rest,
        altitud: altitud.toString(),
        regionId: Number(region.value),
        provinciaId: Number(provincia.value),
        distritoId: Number(distrito.value),
      });

      return res.data;
    },
    onSuccess: () => {
      notify.success({ message: 'Posta Actualizada correctamente' });
      router.push('/posta');
    },
    onError: () => {
      notify.error({ message: 'Error al actualizar la posta' });
    },
  });

  const onSubmit = (data: PostaSchemaType) => {
    createPosta(data);
  };

  return (
    <form className="flex w-full flex-col gap-y-4 p-5" onSubmit={handleSubmit(onSubmit)}>
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Postas',
            icon: <LuBuilding2 />,
            href: '/posta',
          },
          {
            title: 'Actualizar Posta',
            href: `/posta/editar/${defaultData.postaId}`,
          },
        ]}
      />

      <Title
        icon={<LuBuilding2 />}
        title="Actualizar Posta"
        description="Completa el formulario para actualizar la posta"
      />

      <main className="flex flex-col gap-y-3">
        <section className="bg-ob-black-3 border-ob-gray-4 grid grid-cols-2 gap-4 rounded-3xl border p-[17px]">
          <p className="text-ob-white col-span-2">Informacion Basica</p>

          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Ruc"
              id="ruc"
              {...register('ruc')}
              placeholder="12312312312"
              error={errors.ruc?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Ipress"
              id="ipress"
              {...register('ipress')}
              placeholder="12312312"
              error={errors.ipress?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Nombre"
              id="name"
              {...register('nombre')}
              placeholder="Hospital Nacional"
              error={errors.nombre?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Dirección"
              id="address"
              {...register('direccion')}
              placeholder="Av. Siempre Viva 123"
              error={errors.direccion?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Altitud"
              id="altitude"
              {...register('altitud', { valueAsNumber: true })}
              placeholder="12312312312"
              error={errors.altitud?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <InputDate
              label="Fecha de Inicio de Actividad"
              id="fechaInicioActividad"
              onChange={(date) => {
                setValue('fechaInicioActividad', date.toISOString().split('T')[0]);
              }}
              value={parse(
                watch('fechaInicioActividad') || new Date().toISOString().split('T')[0],
                'yyyy-MM-dd',
                new Date(),
              )}
              error={errors.fechaInicioActividad?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Input
              label="Capacidad"
              id="capacidad"
              {...register('capacidad', { valueAsNumber: true })}
              placeholder="12"
              error={errors.capacidad?.message}
            />
          </div>

          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Select
              label="Región"
              options={regiones.map((region) => ({
                label: region.nombre,
                value: region.regionId.toString(),
              }))}
              onChange={(option) => {
                setValue('region', option);
                getProvincias({ regionId: option.value });
              }}
              value={watch('region')}
              disableSearch
              error={errors.region?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Select
              label="Provincia"
              options={resProvincia?.data.map((region) => ({
                label: region.nombre,
                value: region.provinciaId.toString(),
              }))}
              onChange={(option) => {
                setValue('provincia', option);
                getDistrito({ provinciaId: option.value });
              }}
              value={watch('provincia')}
              disableSearch
              disable={!enableProvincia}
              error={errors.provincia?.message}
            />
          </div>
          <div className="border-ob-gray-4 rounded-xl border p-[13px]">
            <Select
              label="Distrito"
              options={resDistrito?.data.map((region) => ({
                label: region.nombre,
                value: region.distritoId.toString(),
              }))}
              onChange={(option) => {
                setValue('distrito', option);
              }}
              value={watch('distrito')}
              disableSearch
              disable={!enableDistrito}
              error={errors.distrito?.message}
            />
          </div>
        </section>
        <section className="bg-ob-black-3 border-ob-gray-4 flex flex-col gap-4 rounded-3xl border p-[17px]">
          <p className="text-ob-white col-span-2">Mapa</p>

          <Mapa
            position={{
              lat: Number(watchLat) || -12.0464,
              lng: Number(watchLng) || -77.0428,
            }}
            setPosistion={(position) => {
              setValue('lat', position.lat.toString());
              setValue('lng', position.lng.toString());
            }}
          />
        </section>
      </main>
      <footer className="flex w-full justify-end gap-x-4">
        <Button
          onClick={() => {
            router.back();
          }}
          type="button"
          className="border-ob-gray-4 border bg-transparent font-semibold text-white"
        >
          Cancelar
        </Button>

        <Button className="flex items-center justify-center gap-x-1 text-white">
          <LuSave />
          Actualizar Posta
        </Button>
      </footer>
    </form>
  );
}
