'use client';

import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import Title from '@/components/ui/title/Title';
import { LuFlaskConical, LuHouse } from 'react-icons/lu';
import TablaLaboratorio from './TablaLaboratorio';
import { ResponsePruebaLaboratorio } from '@/interface/response.interface';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Button from '@/components/ui/button/Button';

interface LaboratorioViewProps {
  data: ResponsePruebaLaboratorio[];
}

export default function LaboratorioView({ data }: LaboratorioViewProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden p-5">
      <Breadcrums
        items={[
          { title: 'Inicio', icon: <LuHouse />, href: '/' },
          { title: 'Laboratorio', href: '/laboratorio' },
        ]}
      />

      <div className="mt-2 mb-4 flex items-center justify-between">
        <Title
          title="Resultados y órdenes"
          description="Consulta órdenes, estados y completa resultados de las pruebas. No se pueden crear nuevas órdenes desde esta vista."
          icon={<LuFlaskConical size={20} />}
        />
        <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">Exportar</Button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        <div className="border-ob-gray-4 bg-ob-black-2 flex-1 overflow-auto rounded-xl border p-4">
          <TablaLaboratorio data={data} />
        </div>

        <InfoContainer title="Plantillas frecuentes" className="h-auto shrink-0">
          <p className="text-ob-gray-2 mb-3 text-sm">
            Atajos para completar datos de resultados comunes
          </p>
          <div className="flex gap-3">
            <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">
              <LuFlaskConical className="mr-2" /> Hemograma
            </Button>
            <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">
              <LuFlaskConical className="mr-2" /> Glucosa
            </Button>
            <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">
              <LuFlaskConical className="mr-2" /> Urocultivo
            </Button>
            <Button className="bg-ob-black-3 text-ob-white border-ob-gray-4 border">
              <LuFlaskConical className="mr-2" /> VDRL
            </Button>
          </div>
        </InfoContainer>
      </div>
    </div>
  );
}
