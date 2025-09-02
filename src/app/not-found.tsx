import React from "react";
import {
  LuStethoscope,
  LuSearch,
  LuShield,
  LuClock,
  LuHouse,
} from "react-icons/lu";
import { PiWarningBold } from "react-icons/pi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import Button from "@/components/ui/button/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen font-inter">
      <div className="flex items-center bg-ob-black-6 rounded-3xl border border-ob-gray overflow-hidden">
        <div className="flex flex-col gap-y-5 p-12 max-w-lg">
          <span className="flex items-center gap-x-2.5">
            <LuStethoscope size={20} className="text-ob-white" />
            <p className="text-lg font-semibold text-ob-white">
              Portal de Obstetricia
            </p>
          </span>
          <span className="flex items-center gap-x-2 rounded-full bg-ob-blue-2 px-2.5 py-1.5 w-fit">
            <PiWarningBold size={16} className="text-ob-lightblue" />
            <p className="text-sm font-semibold text-ob-lightblue">Error 404</p>
          </span>
          <div className="flex flex-col gap-y-5 font-medium ">
            <span className="text-ob-white text-[40px] ">
              <span className="font-semibold">Pagina no</span> encontrada
            </span>
            <p className="text-ob-gray-2">
              <span className="font-bold">
                La ruta que intentas abrir no existe o fue movida.{" "}
              </span>
              Puedes volver al inicio o revisar los modulos disponibles.
            </p>
          </div>
          <div className="flex items-center justify-between gap-x-3 border-b pb-5 border-ob-gray">
            <Button className="font-medium">
              <LuHouse size={18} className="text-ob-black" />
              Volver al Inicio
            </Button>
            <Button className="bg-transparent border border-ob-gray text-ob-white">
              <LuSearch size={18} className="text-ob-white" />
              Buscar
            </Button>
            <Button className="text-ob-lightblue bg-ob-blue-2">
              <HiOutlineSquares2X2 size={18} className="text-ob-lightblue" />
              Ver Modulos
            </Button>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="flex items-center gap-x-1.5 font-semibold text-ob-gray-2">
              <LuShield size={16} className="text-ob-gray-2" />
              Sesión Segura
            </span>
            <span className="flex items-center gap-x-1.5 font-semibold text-ob-gray-2">
              <LuClock size={16} className="text-ob-gray-2" />
              Actualizado: Ahora
            </span>
          </div>
          <p className="text-ob-gray-2">
            <span className="font-bold">
              Si crees que es un error, contacta al administrador o
            </span>{" "}
            intenta más tarde
          </p>
          <span className="rounded-md border border-ob-gray text-ob-white p-3">
            GET /ruta-desconocida - 404
          </span>
        </div>
        <div className="bg-ob-blue-3 p-8 w-[399px] h-[673px]">
          <Image
            src="https://res.cloudinary.com/dl0wif5vm/image/upload/v1756779047/oetmwfy0gtch546jkysg.webp"
            alt="Corredor de Hospital"
            className="rounded-xl h-full w-full object-cover"
            width={335}
            height={555}
          />
        </div>
      </div>
    </div>
  );
}
