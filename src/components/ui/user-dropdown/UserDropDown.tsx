"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RiArrowDropDownLine } from "react-icons/ri";
import { LuShield, LuUser } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import ButtonLink from "../button-link/ButtonLink";
import { motion, AnimatePresence } from "motion/react";
import { useClose } from "@/hooks/useClose";
import { useAuth } from "@/components/context/AuthContext";

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
    <div className="flex flex-col font-medium reltive" ref={ref}>
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className=" absolute overflow-hidden z-10 top-full right-5 flex flex-col bg-ob-black-3 rounded-xl border border-ob-gray w-[260px]"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
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
                <span className="text-sm text-ob-white">{user}</span>
                <span className="text-sm text-ob-gray-2">{email}</span>
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
            <button
              className="flex items-center gap-x-2.5 p-2.5 text-ob-white cursor-pointer"
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
