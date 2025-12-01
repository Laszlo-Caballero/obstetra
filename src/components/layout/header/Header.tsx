'use client';
import { useAuth } from '@/components/context/AuthContext';
import { env } from '@/config/env';
import UserDropDown from '@/components/ui/user-dropdown/UserDropDown';
import React from 'react';
import { LuUser } from 'react-icons/lu';
import UserSkeleton from '@/components/skeleton/user/UserSkeleton';
import ToggleTheme from '@/components/ui/toggle-theme/ToggleTheme';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="dark:bg-ob-black-3 border-ob-white-3 dark:border-ob-gray sticky top-0 z-50 flex h-[57px] items-center justify-between border-b bg-white px-5 py-2.5">
      <div className="flex items-center gap-x-3">
        <span className="bg-ob-white-4 dark:bg-ob-blue-2 border-ob-white-3 dark:border-ob-blue rounded-xl border-2 p-1">
          <LuUser size={16} className="text-ob-black-4 dark:text-ob-white" />
        </span>
        <p className="text-ob-black-4 dark:text-ob-white text-lg font-medium">Perfil de Usuario</p>
      </div>

      <div className="flex items-center gap-x-2">
        {user ? (
          <UserDropDown
            user={user?.personal.nombre}
            icon={`${env.api_images}${user?.recurso?.url}`}
            email={user?.personal.correo}
          />
        ) : (
          <UserSkeleton />
        )}

        <ToggleTheme />
      </div>
    </header>
  );
}
