'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { LuShield, LuUser } from 'react-icons/lu';
import { PiSignOutBold } from 'react-icons/pi';
import ButtonLink from '../button-link/ButtonLink';
import { motion, AnimatePresence } from 'motion/react';
import { useClose } from '@/hooks/useClose';
import { useAuth } from '@/components/context/AuthContext';

interface UserDropDownProps {
  user?: string;
  email: string;
  icon: string;
}

export default function UserDropDown({ user, icon, email }: UserDropDownProps) {
  const [isOpen, setOpen] = useState(false);

  const ref = useClose({
    closeFunction: () => setOpen(false),
  });

  const { logout } = useAuth();

  return (
    <div className="reltive flex flex-col font-medium" ref={ref}>
      <div
        className="bg-ob-blue-2 flex cursor-pointer items-center gap-x-2.5 rounded-xl px-2.5 py-1.5"
        onClick={() => setOpen(!isOpen)}
      >
        <Image
          src={icon}
          className="w-6 rounded-full"
          alt="foto de perfil"
          width={24}
          height={24}
        />
        <span className="text-ob-lightblue text-sm font-medium">{user}</span>
        <RiArrowDropDownLine size={18} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="bg-ob-black-3 border-ob-gray absolute top-full right-5 z-10 flex w-[260px] flex-col overflow-hidden rounded-xl border"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
          >
            <div className="flex items-center gap-x-2.5 p-3">
              <Image
                src={icon}
                className="rounded-full"
                alt="foto de perfil"
                width={36}
                height={36}
              />
              <span className="flex flex-col">
                <span className="text-ob-white text-sm">{user}</span>
                <span className="text-ob-gray-2 text-sm">{email}</span>
              </span>
            </div>
            <span className="text-ob-gray-2 p-2 text-xs">Cuenta</span>
            <ButtonLink
              href="/perfil"
              className="text-ob-white hover:bg-ob-blue-2 border-ob-gray rounded-none border-b p-2.5"
            >
              <LuUser size={18} />
              Perfil
            </ButtonLink>
            <ButtonLink
              href="/"
              className="text-ob-white border-ob-gray hover:bg-ob-blue-2 rounded-none border-b p-2.5"
            >
              <LuShield size={18} />
              Seguridad
            </ButtonLink>
            <span className="text-ob-gray-2 p-2 text-xs">Sesion</span>
            <button
              className="text-ob-white flex cursor-pointer items-center gap-x-2.5 p-2.5"
              onClick={logout}
            >
              <PiSignOutBold size={18} />
              Cerrar Sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
