import React from 'react';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import { LuUserCog } from 'react-icons/lu';
import { GoHome } from 'react-icons/go';
import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { env } from '@/config/env';
import { fetcher } from '@/libs/fetch';
import { ResponseUser } from '@/interface/user.interface';
import Photo from '@/modules/perfil/components/photo/Photo';
import Title from '@/components/ui/title/Title';
import ProfileUpdateForm from '@/modules/perfil/components/form/ProfileUpdateForm';

export default async function Perfilpage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('obstetra_token')?.value;

  if (!token) {
    return notFound();
  }

  const res = await fetcher<ResponseUser>(`${env.url_api}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res?.data) {
    return <div>Error al cargar el perfil</div>;
  }

  return (
    <div className="h-full w-full">
      <main className="flex flex-col gap-y-4 p-5">
        <Breadcrums
          items={[
            {
              title: 'Inicio',
              icon: <GoHome />,
              href: '/',
            },
            {
              title: 'Perfil',
              href: '/perfil',
            },
          ]}
        />

        {/* Titulo */}

        <section className="flex items-center justify-between">
          <Title
            title="Ver y Editar Perfil"
            description="Actualiza tu informacion personal, credenciales y preferencias."
            icon={<LuUserCog size={18} />}
          />
        </section>

        {/* Perfil */}

        <InfoContainer>
          <Photo
            apellidoMaterno={res.data.personal.apellidoMaterno}
            apellidoPaterno={res.data.personal.apellidoPaterno}
            correo={res.data.personal.correo}
            nombre={res.data.personal.nombre}
            src={res.data.recurso?.url}
          />
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2">
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Rol</span>
              <span className="text-ob-white text-sm font-medium">{res.data.role.roleName}</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Dni</span>
              <span className="text-ob-white text-sm font-medium">{res.data.personal.dni}</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Estado</span>
              <span className="text-ob-white text-sm font-medium">
                {res.data.personal.estado ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Telefono</span>
              <span className="text-ob-white text-sm font-medium">
                +51 {res.data.personal.telefono.slice(0, 3)}{' '}
                {res.data.personal.telefono.slice(3, 6)} {res.data.personal.telefono.slice(6)}
              </span>
            </div>
          </div>
        </InfoContainer>

        {/* Formulario  */}

        <ProfileUpdateForm user={res.data} />
      </main>
    </div>
  );
}
