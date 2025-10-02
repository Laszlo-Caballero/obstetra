import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Button from '@/components/ui/button/Button';
import CardInfo from '@/components/ui/cardInfo/CardInfo';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Modal from '@/components/ui/modal/Modal';
import Title from '@/components/ui/title/Title';
import Toggle from '@/components/ui/toggle/Toggle';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { GrTest } from 'react-icons/gr';
import { LuCalendar, LuDownload, LuPlus, LuSmile, LuTarget } from 'react-icons/lu';

export default function ResumenPage() {
  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Metas',
            href: '/metas',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Metas Anuales y Mensuales"
          description="Visualiza el progreso por periodo y área. Filtra por año, mes y programa"
          icon={<LuTarget size={18} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="border-ob-gray text-ob-white hover:bg-ob-blue-2 border bg-transparent">
            <LuDownload size={18} />
            Exportar
          </Button>
          <ButtonModal modal={<Modal />} className="hover:bg-ob-lightblue-2 bg-ob-teal">
            <LuPlus size={18} />
            Nueva Meta
          </ButtonModal>
        </div>
      </section>
      <InfoContainer className="flex-row items-center justify-between">
        <div>FILTROOOS</div>
        <Toggle items={['Anuales', 'Mensuales']} className={{ main: 'bg-ob-blue-2' }} />
      </InfoContainer>
      <div className="flex items-center gap-x-3">
        <InfoContainer className="w-[50%] font-medium">
          <span className="text-ob-white">Resumen Mensual</span>
          <div className="flex items-center gap-x-3">
            <CardInfo
              title="Citas Atendidas"
              description="124 / 140"
              icon={<LuCalendar size={22} />}
            />
            <CardInfo
              title="Pruebas Validadas"
              description="89 / 110"
              icon={<GrTest size={22} />}
            />
            <CardInfo title="Satisfaccion" description="91% / 100%" icon={<LuSmile size={22} />} />
          </div>
        </InfoContainer>
        <InfoContainer className="w-[50%] font-medium">
          <span className="text-ob-white">Resumen Anual</span>
          <div className="flex items-center gap-x-3">
            <CardInfo
              title="Citas Atendidas"
              description="1240 / 1400"
              icon={<LuCalendar size={22} />}
            />
            <CardInfo
              title="Pruebas Validadas"
              description="890 / 1100"
              icon={<GrTest size={22} />}
            />
            <CardInfo title="Satisfaccion" description="91% / 100%" icon={<LuSmile size={22} />} />
          </div>
        </InfoContainer>
      </div>
    </div>
  );
}
