import { ResponsePersonal } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Badge from '@/components/ui/badge/Badge';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import CardInfo from '@/components/ui/cardInfo/CardInfo';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { GoHome } from 'react-icons/go';
import { LuArrowLeft, LuCircleCheck, LuTrash2, LuUser } from 'react-icons/lu';
import cx from '@/libs/cx';
import Button from '@/components/ui/button/Button';
import Mapa from '@/components/ui/map/Map';
import Tabs from '@/components/ui/tabs/Tabs';
import TabsHeader from '@/components/ui/tabs/TabsHeader';
import TabButton from '@/components/ui/tabs/TabButton';
import TabBody from '@/components/ui/tabs/TabBody';

export default async function DetallePersonalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const resPersonal = await fetcher<ResponsePersonal>(`/personal/${id}`);

  if (!resPersonal) {
    redirect('/404');
  }

  const data = resPersonal.data;

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
      <main className="flex flex-col gap-y-4">
        <InfoContainer className="bg-ob-black-6">
          <section className="flex items-center justify-between">
            <Title
              title={data?.nombre + ' ' + data?.apellidoPaterno + ' ' + data?.apellidoMaterno}
              description={`ID: ${data?.personalId} - DNI: ${data?.dni} - Correo: ${data?.correo}`}
              icon={<LuUser size={18} />}
            />
            <span className="flex items-center gap-x-2">
              <Badge className="border-ob-gray flex items-center gap-x-2 border px-3 text-sm">
                <LuCircleCheck size={16} />
                {data.tipoPersonal?.nombre}
              </Badge>
              <Badge
                className={cx('text-ob-white px-3', data?.estado ? 'bg-ob-green' : 'bg-ob-red')}
              >
                {data.estado ? 'Activo' : 'Inactivo'}
              </Badge>
            </span>
          </section>
          <section className="border-ob-gray flex gap-x-7 border-t pt-5">
            <div className="flex w-[50%] flex-col gap-y-3">
              <span> Informacion basica </span>
              <div className="grid grid-cols-3 gap-3">
                <CardInfo title="Nombre" description={data?.nombre} />
                <CardInfo title="Apellido Paterno" description={data?.apellidoPaterno} />
                <CardInfo title="Apellido Materno" description={data?.apellidoMaterno} />
                <CardInfo title="Sexo" description={data?.sexo} />
                <CardInfo title="Fecha de Nacimiento" description={data?.fechaNacimiento} />
                <CardInfo title="Telefono" description={data?.telefono} />
                <CardInfo title="Codigo de Colegio" description={data?.codigoColegio} />
                <CardInfo title="Correo" description={data?.correo} />
                <CardInfo title="Estado" description={data?.estado ? 'Activo' : 'Inactivo'} />
              </div>
            </div>
            <div className="flex w-[50%] flex-col gap-y-3">
              <span> Turno </span>
              <div className="grid grid-cols-2 gap-3">
                <CardInfo title="Inicio" description={data?.turno?.horaInicio || 'Desconocido'} />
                <CardInfo title="Fin" description={data?.turno?.horaFin || 'Desconocido'} />
              </div>
              <span> Tipo Personal </span>
              <div className="grid grid-cols-2 gap-3">
                <CardInfo title="Tipo" description={data?.tipoPersonal?.nombre || 'Desconocido'} />
                <CardInfo
                  title="Estado"
                  description={data?.tipoPersonal?.estado ? 'Activo' : 'Inactivo'}
                />
              </div>
            </div>
          </section>
        </InfoContainer>
        <div className="flex gap-x-6">
          <InfoContainer className="bg-ob-black-6 w-[50%]">
            <span>Posta Asignada</span>

            <Tabs>
              <TabsHeader>
                {data.posta.map((posta) => {
                  return <TabButton key={posta.postaId}>{posta.nombre}</TabButton>;
                })}
              </TabsHeader>
              <TabBody>
                {data.posta.map((posta) => (
                  <div className="flex flex-col gap-3">
                    <CardInfo title="Nombre" description={posta.nombre} />

                    <div className="grid grid-cols-3 gap-3">
                      <CardInfo title="RUC" description={posta.ruc} />
                      <CardInfo title="IPRESS" description={posta.ipress} />
                      <CardInfo title="Capacidad" description={posta.capacidad?.toString()} />
                      <CardInfo
                        title="Inicio de Actividad"
                        description={posta.fechaInicioActividad}
                      />
                      <CardInfo title="Creación" description={posta.fechaCreacion} />
                      <CardInfo title="Estado" description={posta.estado ? 'Activo' : 'Inactivo'} />
                    </div>

                    <CardInfo title="Dirección" description={posta.direccion} />

                    <span className="border-ob-gray border-t" />

                    <div className="grid grid-cols-3 gap-3">
                      <CardInfo title="Latitud" description={posta.lat?.toString()} />
                      <CardInfo title="Longitud" description={posta.lng?.toString()} />
                      <CardInfo title="Altitud" description={posta.altitud?.toString()} />
                    </div>

                    <Mapa
                      position={{
                        lat: Number(posta.lat),
                        lng: Number(posta.lng),
                      }}
                      disableHeader
                    />
                  </div>
                ))}
              </TabBody>
            </Tabs>
          </InfoContainer>
          <InfoContainer className="bg-ob-black-6 w-[50%]">
            <span>Historial y Acciones</span>
          </InfoContainer>
        </div>
      </main>
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
