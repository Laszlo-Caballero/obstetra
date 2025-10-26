'use client';
import { ResponsePersonal, ResponsePosta } from '@/interface/response.interface';
import React, { useState } from 'react';
import Badge from '@/components/ui/badge/Badge';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import CardInfo from '@/components/ui/cardInfo/CardInfo';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { GoHome } from 'react-icons/go';
import { LuArrowLeft, LuCircleCheck, LuTrash2, LuUser } from 'react-icons/lu';
import cx from '@/libs/cx';
import Select from '@/components/ui/select/Select';
import Button from '@/components/ui/button/Button';

interface DetallePersonalProps {
  data: ResponsePersonal;
}
export default function DetallePersonal({ data }: DetallePersonalProps) {
  const [selectedPosta, setSelectedPosta] = useState<ResponsePosta | null>(null);
  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Personal',
            href: '/personal',
          },
          {
            title: 'Deta',
            href: '/personal/deta',
          },
        ]}
      />
      <form className="flex flex-col gap-y-4">
        <InfoContainer className="bg-ob-black-6">
          <section className="flex items-center justify-between">
            <Title
              title={data.nombre + ' ' + data.apellidoPaterno + ' ' + data.apellidoMaterno}
              description={`ID: ${data.personalId} - DNI: ${data.dni} - Correo: ${data.correo}`}
              icon={<LuUser size={18} />}
            />
            <span className="flex items-center gap-x-2">
              <Badge className="border-ob-gray flex items-center gap-x-2 border px-3 text-sm">
                <LuCircleCheck size={16} />
                {data.tipoPersonal?.nombre}
              </Badge>
              <Badge
                className={cx('text-ob-white px-3', data.estado ? 'bg-ob-green' : 'bg-ob-red')}
              >
                {data.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            </span>
          </section>
          <section className="border-ob-gray flex gap-x-7 border-t pt-5">
            <div className="flex w-[50%] flex-col gap-y-3">
              <span> Informacion basica </span>
              <div className="grid grid-cols-3 gap-3">
                <CardInfo title="Nombre" description={data.nombre} />
                <CardInfo title="Apellido Paterno" description={data.apellidoPaterno} />
                <CardInfo title="Apellido Materno" description={data.apellidoPaterno} />
                <CardInfo title="Sexo" description={data.sexo} />
                <CardInfo title="Fecha de Nacimiento" description={data.fechaNacimiento} />
                <CardInfo title="Telefono" description={data.telefono} />
                <CardInfo title="Codigo de Colegio" description={data.codigoColegio} />
                <CardInfo title="Correo" description={data.correo} />
                <CardInfo title="Estado" description={data.estado ? 'Activo' : 'Inactivo'} />
              </div>
            </div>
            <div className="flex w-[50%] flex-col gap-y-3">
              <span> Turno </span>
              <div className="grid grid-cols-2 gap-3">
                <CardInfo title="Inicio" description={data.turno.horaInicio} />
                <CardInfo title="Fin" description={data.turno.horaFin} />
              </div>
              <span> Tipo Personal </span>
              <div className="grid grid-cols-2 gap-3">
                <CardInfo title="Tipo" description={data.tipoPersonal.nombre} />
                <CardInfo
                  title="Estado"
                  description={data.tipoPersonal.estado ? 'Activo' : 'Inactivo'}
                />
              </div>
            </div>
          </section>
        </InfoContainer>
        <div className="flex gap-x-6">
          <InfoContainer className="bg-ob-black-6 w-[50%]">
            <span>Posta Asignada</span>
            <Select
              placeholder="Tipo Personal"
              label="tipo"
              className={{ label: 'text-ob-white text-sm' }}
              disableSearch={true}
              options={data.posta.map((posta) => ({
                label: posta.nombre,
                value: posta,
              }))}
              onChange={(opcion) => setSelectedPosta(opcion.value)}
              value={
                selectedPosta ? { label: selectedPosta.nombre, value: selectedPosta } : undefined
              }
            />

            {selectedPosta ? (
              <>
                <CardInfo title="Nombre" description={selectedPosta.nombre} />

                <div className="grid grid-cols-3 gap-3">
                  <CardInfo title="RUC" description={selectedPosta.ruc} />
                  <CardInfo title="IPRESS" description={selectedPosta.ipress} />
                  <CardInfo title="Capacidad" description={selectedPosta.capacidad?.toString()} />
                  <CardInfo
                    title="Inicio de Actividad"
                    description={selectedPosta.fechaInicioActividad}
                  />
                  <CardInfo title="Creación" description={selectedPosta.fechaCreacion} />
                  <CardInfo
                    title="Estado"
                    description={selectedPosta.estado ? 'Activo' : 'Inactivo'}
                  />
                </div>

                <CardInfo title="Dirección" description={selectedPosta.direccion} />

                <span className="border-ob-gray border-t" />

                <div className="grid grid-cols-3 gap-3">
                  <CardInfo title="Latitud" description={selectedPosta.lat?.toString()} />
                  <CardInfo title="Longitud" description={selectedPosta.lng?.toString()} />
                  <CardInfo title="Altitud" description={selectedPosta.altitud?.toString()} />
                </div>

                <span>Mapa :D</span>
              </>
            ) : (
              <p className="text-ob-gray-2 mt-2 text-sm">
                Selecciona una posta para ver su información.
              </p>
            )}
          </InfoContainer>
          <InfoContainer className="bg-ob-black-6 w-[50%]">
            <span>Historial y Acciones</span>
          </InfoContainer>
        </div>
      </form>
      <div className="flex items-center justify-end gap-x-2">
        <ButtonLink href="/personal" className="border-ob-gray border">
          <LuArrowLeft size={18} />
          Volver
        </ButtonLink>
        <Button className="bg-ob-red-2 text-ob-white font-semibold">
          <LuTrash2 size={18} />
          Eliminar Personal
        </Button>
      </div>
    </div>
  );
}
