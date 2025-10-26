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
    <header className="bg-ob-black-3 border-ob-gray sticky top-0 z-50 flex h-[57px] items-center justify-between border-b px-5 py-2.5">
      <div className="flex items-center gap-x-3">
        <span className="bg-ob-blue-2 border-ob-blue rounded-xl border-2 p-1">
          <LuUser size={16} className="text-ob-white" />
        </span>
        <p className="text-ob-white text-lg font-medium">Perfil de Usuario</p>
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
