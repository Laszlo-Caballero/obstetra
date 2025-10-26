import React from 'react';
import { LuStethoscope, LuSearch, LuShield, LuClock, LuHouse } from 'react-icons/lu';
import { PiWarningBold } from 'react-icons/pi';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import Image from 'next/image';
import { headers } from 'next/headers';
import Link from '@/components/ui/link/Link';
import ToggleTheme from '@/components/ui/toggle-theme/ToggleTheme';

export default async function NotFound() {
  const headersList = await headers();

  const pathname = headersList.get('x-pathname');

  return (
    <div className="font-inter relative flex h-screen items-center justify-center">
      <div className="absolute top-2 right-2">
        <ToggleTheme />
      </div>
      <div className="dark:bg-ob-black-6 border-ob-white-3 dark:border-ob-gray flex items-center overflow-hidden rounded-3xl border bg-white shadow-xl dark:shadow-none">
        <div className="flex max-w-lg flex-col gap-y-5 p-12">
          <span className="flex items-center gap-x-2.5">
            <LuStethoscope size={20} className="text-ob-black-4 dark:text-ob-white" />
            <p className="text-ob-black-4 dark:text-ob-white text-lg font-semibold">
              Portal de Obstetricia
            </p>
          </span>
          <span className="dark:bg-ob-blue-2 bg-ob-white-3 flex w-fit items-center gap-x-2 rounded-full px-2.5 py-1.5">
            <PiWarningBold size={16} className="text-ob-red-7 dark:text-ob-lightblue" />
            <p className="text-ob-red-7 dark:text-ob-lightblue text-sm font-semibold">Error 404</p>
          </span>
          <div className="flex flex-col gap-y-5 font-medium">
            <span className="dark:text-ob-white text-ob-black-4 text-[40px]">
              <span className="font-semibold">Pagina no</span> encontrada
            </span>
            <p className="dark:text-ob-gray-2 text-ob-red-5">
              <span className="font-bold">La ruta que intentas abrir no existe o fue movida. </span>
              Puedes volver al inicio o revisar los modulos disponibles.
            </p>
          </div>
          <div className="dark:border-ob-gray border-ob-white-3 flex items-center justify-between gap-x-3 border-b pb-5">
            <Link className="font-medium" href="/">
              <LuHouse size={18} className="dark:text-ob-black text-white" />
              Volver al Inicio
            </Link>
            <Link
              href="/"
              className="dark:border-ob-gray border-ob-white-3 text-ob-black-4 dark:text-ob-white border bg-transparent"
            >
              <LuSearch size={18} className="dark:text-ob-white text-ob-black-4" />
              Buscar
            </Link>
            <Link
              href="/programas"
              className="dark:text-ob-lightblue text-ob-red-7 bg-ob-white-4 dark:bg-ob-blue-2"
            >
              <HiOutlineSquares2X2 size={18} className="dark:text-ob-lightblue text-ob-red-7" />
              Ver Modulos
            </Link>
          </div>
          <div className="flex items-center gap-x-3">
            <span className="dark:text-ob-gray-2 text-ob-red-5 flex items-center gap-x-1.5 font-semibold">
              <LuShield size={16} className="dark:text-ob-gray-2 text-ob-red-5" />
              Sesión Segura
            </span>
            <span className="dark:text-ob-gray-2 text-ob-red-5 flex items-center gap-x-1.5 font-semibold">
              <LuClock size={16} className="dark:text-ob-gray-2 text-ob-red-5" />
              Actualizado: Ahora
            </span>
          </div>
          <p className="dark:text-ob-gray-2 text-ob-red-5">
            <span className="font-bold">Si crees que es un error, contacta al administrador o</span>{' '}
            intenta más tarde
          </p>
          <span className="dark:border-ob-gray border-ob-white-3 text-ob-black-4 dark:text-ob-white rounded-md border p-3">
            GET {pathname} - 404
          </span>
        </div>
        <div className="dark:bg-ob-blue-3 bg-ob-white-4 h-[673px] w-[399px] p-8">
          <Image
            src="https://res.cloudinary.com/dl0wif5vm/image/upload/v1756779047/oetmwfy0gtch546jkysg.webp"
            alt="Corredor de Hospital"
            className="h-full w-full rounded-xl object-cover"
            width={335}
            height={555}
          />
        </div>
      </div>
    </div>
  );
}
