import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import ProgressBar from '@/components/ui/progress-bar/ProgressBar';
import SmallCard from '@/components/ui/small-card/SmallCard';
import React from 'react';
import { BiBarChartAlt } from 'react-icons/bi';
import { LuCalendar, LuPencilLine } from 'react-icons/lu';

export default function MetasArea() {
  return (
    <InfoContainer>
      <span>Metas del Area</span>
      <SmallCard
        icon={<LuCalendar size={18} />}
        title="Meta Mensual: Atender 1400 citas"
        description="Periodo: Agosto 2025"
      >
        <ProgressBar porcentaje="60%" />
      </SmallCard>
      <SmallCard
        icon={<LuCalendar size={18} />}
        title="Meta Anual: Atender 1500 citas"
        description="Periodo: Agosto 2025"
      >
        <ProgressBar porcentaje="50%" />
      </SmallCard>
      <SmallCard
        icon={<LuCalendar size={18} />}
        title="Meta Mensual: Validar 180 pruebas"
        description="Periodo: Agosto 2025"
      >
        <ProgressBar porcentaje="80%" />
      </SmallCard>
      <div className="flex items-center justify-between">
        <Button className="bg-ob-black-5 border-ob-gray text-ob-white border">
          <LuPencilLine size={18} />
          Editar Metas
        </Button>
        <Button className="bg-ob-blue-2 text-ob-lightblue">
          <BiBarChartAlt size={18} />
          Ver Historial
        </Button>
      </div>
    </InfoContainer>
  );
}
