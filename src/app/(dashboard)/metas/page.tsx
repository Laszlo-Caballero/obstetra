import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Button from '@/components/ui/button/Button';
import Modal from '@/components/ui/modal/Modal';
import Title from '@/components/ui/title/Title';
import React from 'react';
import { GoHome } from 'react-icons/go';
import { LuDownload, LuPlus, LuTarget } from 'react-icons/lu';

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
    </div>
  );
}
