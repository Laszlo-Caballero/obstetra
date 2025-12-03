'use client';

import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Title from '@/components/ui/title/Title';
import React, { useState } from 'react';
import { LuCalendar, LuHouse, LuRefreshCcw } from 'react-icons/lu';
import AtencionCard from '@/modules/atencion/components/AtencionCard';
import Button from '@/components/ui/button/Button';
import { ResponseCita } from '@/interface/response.interface';
import { useRouter } from 'next/navigation';

interface AtencionViewProps {
  initialCitas: ResponseCita[];
}

export default function AtencionView({ initialCitas }: AtencionViewProps) {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const proximas = initialCitas.filter((c) => c.estado === 'Pendiente');
  const completadas = initialCitas.filter((c) => c.estado === 'Completado');

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const timeString = currentDate.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 1000); // Visual feedback
  };

  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <LuHouse />,
            href: '/',
          },
          {
            title: 'Atención',
            href: '/atencion',
          },
        ]}
      />

      <Title
        title="Vista de atención"
        description="Gestiona tus citas del día"
        icon={<LuCalendar size={20} />}
      />

      <div className="bg-ob-black-2 border-ob-white-3 dark:border-ob-gray flex items-center justify-between rounded-xl border p-4">
        <div className="flex items-center gap-x-2">
          <div className="bg-ob-teal flex size-10 items-center justify-center rounded-full text-white">
            <LuCalendar size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-ob-white font-medium">
              Ahora: {dateString} — {timeString}
            </span>
            <span className="text-ob-gray-2 text-sm">
              Después de tu turno, las citas restantes se desactivarán automáticamente.
            </span>
          </div>
        </div>
        <Button className="bg-ob-black-3 hover:bg-ob-black-4 text-ob-white" onClick={handleRefresh}>
          <LuRefreshCcw className={isRefreshing ? 'animate-spin' : ''} />
          Actualizar
        </Button>
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-ob-white font-medium">Próximas</h3>
          <span className="bg-ob-black-3 text-ob-gray-2 rounded-full px-2 py-0.5 text-xs">
            {proximas.length}
          </span>
        </div>
        {proximas.length > 0 ? (
          proximas.map((cita) => <AtencionCard key={cita.citaId} cita={cita} />)
        ) : (
          <div className="text-ob-gray-2 py-10 text-center text-sm">No hay citas próximas</div>
        )}
      </div>
    </div>
  );
}
