import Image from "next/image";
import React from "react";
import { LuUser } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Header() {
  return (
    <header className="flex sticky top-0 h-[57px] items-center justify-between bg-ob-black-3 px-5 py-2.5 border-b border-ob-gray">
      <div className="flex items-center gap-x-3">
        <span className="bg-ob-blue-2 rounded-xl border-2 border-ob-blue p-1">
          <LuUser size={16} className="text-ob-white" />
        </span>
        <p className="text-ob-white font-medium text-lg">Perfil de Usuario</p>
      </div>
      <div className="flex items-center bg-ob-blue-2 gap-x-2.5 px-2.5 py-1.5 cursor-pointer rounded-xl">
        <Image
          src="https://res.cloudinary.com/dl0wif5vm/image/upload/v1756779110/nviouobzjm4eiaw301zf.webp"
          className="w-6 rounded-full"
          alt="foto de perfil"
          width={24}
          height={24}
        />
        <span className="text-ob-lightblue font-medium text-sm">Admin</span>
        <RiArrowDropDownLine size={18} />
      </div>
    </header>
  );
}
