"use client";
import { useAuth } from "@/components/context/AuthContext";
import { env } from "@/config/env";
import UserDropDown from "@/components/ui/user-dropdown/UserDropDown";
import React from "react";
import { LuUser } from "react-icons/lu";
import UserSkeleton from "@/components/skeleton/user/UserSkeleton";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex sticky top-0 z-50 h-[57px] items-center justify-between bg-ob-black-3 px-5 py-2.5 border-b border-ob-gray">
      <div className="flex items-center gap-x-3">
        <span className="bg-ob-blue-2 rounded-xl border-2 border-ob-blue p-1">
          <LuUser size={16} className="text-ob-white" />
        </span>
        <p className="text-ob-white font-medium text-lg">Perfil de Usuario</p>
      </div>

      {user ? (
        <UserDropDown
          user={user?.personal.nombre}
          icon={`${env.api_images}${user?.recurso?.url}`}
          email={user?.personal.correo}
        />
      ) : (
        <UserSkeleton />
      )}
    </header>
  );
}
