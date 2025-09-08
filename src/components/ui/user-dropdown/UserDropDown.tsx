"use client";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuShield, LuUser } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import ButtonLink from "../button-link/ButtonLink";

interface UserDropDownProps {
  user: string;
  email: string;
  icon: string;
}

export default function UserDropDown({ user, icon, email }: UserDropDownProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="flex flex-col font-medium reltive">
      <div
        className="flex items-center bg-ob-blue-2 gap-x-2.5 px-2.5 py-1.5 cursor-pointer rounded-xl"
        onClick={() => setOpen(!isOpen)}
      >
        <Image
          src={icon}
          className="w-6 rounded-full"
          alt="foto de perfil"
          width={24}
          height={24}
        />
        <span className="text-ob-lightblue font-medium text-sm">{user}</span>
        <RiArrowDropDownLine size={18} />
      </div>
      {isOpen && (
        <div className=" absolute z-10 top-full right-5 flex flex-col bg-ob-black-3 rounded-xl border border-ob-gray w-[260px]">
          <div className="flex items-center gap-x-2.5 p-3">
            <Image
              src={icon}
              className="rounded-full"
              alt="foto de perfil"
              width={36}
              height={36}
            />
            <span className="flex flex-col">
              <span className="text-sm text-ob-white">{user}</span>
              <span className="TEXT-XS text-ob-gray-2">{email}</span>
            </span>
          </div>
          <span className="p-2 text-ob-gray-2 text-xs">Cuenta</span>
          <ButtonLink
            href="/perfil"
            className="p-2.5 text-ob-white rounded-none hover:bg-ob-blue-2 border-b border-ob-gray "
          >
            <LuUser size={18} />
            Perfil
          </ButtonLink>
          <ButtonLink
            href="/"
            className=" p-2.5 text-ob-white border-b border-ob-gray rounded-none hover:bg-ob-blue-2 "
          >
            <LuShield size={18} />
            Seguridad
          </ButtonLink>
          <span className="p-2 text-ob-gray-2 text-xs">Sesion</span>
          <span className="flex items-center gap-x-2.5 p-2.5 text-ob-white">
            <PiSignOutBold size={18} />
            Cerrar Sesión
          </span>
        </div>
      )}
    </div>
  );
}
