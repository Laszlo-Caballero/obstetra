import Button from '@/components/ui/button/Button';
import CardHelp from '@/components/ui/card-help/CardHelp';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Search from '@/components/ui/search/Search';
import Select from '@/components/ui/select/Select';
import React from 'react';
import {
  LuBookmark,
  LuBookOpen,
  LuFilter,
  LuLock,
  LuMessageCircle,
  LuPlus,
  LuShield,
} from 'react-icons/lu';

export default function AyudaPage() {
  return (
    <div className="flex w-full flex-col items-center gap-y-4 p-5">
      <div className="flex w-full max-w-[1052px] flex-col items-start gap-y-6">
        <div className="flex flex-col items-start gap-y-1">
          <h1 className="text-ob-white text-xl font-semibold">Preguntas frecuentes</h1>
          <p className="text-ob-gray-2">
            Encuentra respuestas rápidas a dudas comunes sobre el sistema.
          </p>
        </div>
        <InfoContainer className="bg-ob-black-6 w-[1040px] gap-y-4">
          <div className="flex items-center gap-x-3">
            <Search placeholder="Buscar pregunta, módulo o palabra clave" />
            <Select placeholder="Todos los Módulos" iconInput={<LuFilter size={18} />} />
            <Select placeholder="Relevancia" iconInput={<LuBookmark size={18} />} />
            <Button className="text-ob-white bg-ob-blue-2 text-nowrap">
              <LuPlus size={18} />
              Sugerir Pregunta
            </Button>
          </div>
          <CardHelp
            icon={<LuLock size={18} />}
            question="¿Cómo ingreso al sistema si olvide mi contraseña?"
            iconBadge={<LuShield size={18} />}
            badge="Login"
            resumen='En la pantalla de acceso, selecciona "¿Olvidaste tu Contraseña?". Recibirás un correo con instrucciones para crear una nueva. Si no llega, revisa spam o contacta a soporte.'
          />
          <CardHelp
            icon={<LuLock size={18} />}
            question="¿Cómo ingreso al sistema si olvide mi contraseña?"
            iconBadge={<LuShield size={18} />}
            badge="Login"
            resumen='En la pantalla de acceso, selecciona "¿Olvidaste tu Contraseña?". Recibirás un correo con instrucciones para crear una nueva. Si no llega, revisa spam o contacta a soporte.'
          />
          <div className="flex items-center justify-between">
            <p className="text-ob-gray-2">
              ¿Aún con dudas? Revisa las siguientes guías de inicio de sesión.
            </p>
            <span className="flex items-center gap-x-2">
              <Button className="text-ob-white bg-ob-blue-2 text-nowrap">
                <LuBookOpen size={18} />
                Guía de Login
              </Button>
              <Button className="font-bold text-nowrap">
                <LuMessageCircle size={18} />
                Contactar Soporte
              </Button>
            </span>
          </div>
        </InfoContainer>
      </div>
    </div>
  );
}
