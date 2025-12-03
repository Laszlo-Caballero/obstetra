import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Title from '@/components/ui/title/Title';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuUserPlus, LuUsers } from 'react-icons/lu';
import UserCreateForm from '@/modules/usuarios/components/UserCreateForm';

export default function CreateUserPage() {
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
            title: 'Usuarios',
            href: '/usuarios',
            icon: <LuUsers />,
          },
          {
            title: 'Crear Usuario',
            href: '/usuarios/crear',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Crear Usuario"
          description="Registra un nuevo usuario y asigna su rol y acceso."
          icon={<LuUserPlus size={18} />}
        />
      </section>

      <UserCreateForm />
    </div>
  );
}
