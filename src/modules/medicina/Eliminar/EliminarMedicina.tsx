import Button from '@/components/ui/button/Button';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import TextArea from '@/components/ui/textarea/Textarea';
import React from 'react';
import { LuTrash2, LuX } from 'react-icons/lu';
import { PiWarningBold } from 'react-icons/pi';
import { RiProhibitedLine } from 'react-icons/ri';

interface EliminarMedicinaProps {
  onClose?: () => void;
}

export default function EliminarMedicina({ onClose }: EliminarMedicinaProps) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Deshabilitar Medicina" badge="Acción Critica">
          <LuTrash2 size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <form className="flex flex-col gap-y-4 p-4">
        <span className="bg-ob-orange text-ob-black flex w-[536px] items-center gap-x-2.5 rounded-xl p-3 text-sm text-wrap">
          <span>
            <PiWarningBold size={18} />
          </span>
          <span className="font-semibold">
            Estás a punto de inhabilitar una Medicina. El personal no podrá registrarla en recetas.
            Esta acción es irreversible.
          </span>
        </span>
        <div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">Medicina</span>
            Paracetamol 500mg
          </div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">Presentacion</span>
            Tableta X 10 Pastillas
          </div>
          <div className="border-ob-gray flex items-center justify-between border-b border-dashed py-2">
            <span className="text-ob-gray-2">Fecha y Hora</span>
            Hoy, 12:30
          </div>
        </div>
        <TextArea
          label="Motivo de Desactivación"
          placeholder="Agregue una nota para el equipo..."
          rows={4}
          className={{ label: 'text-ob-white text-sm' }}
        />
      </form>
      <ModalFooter nota="No se eliminará datos historicos">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="bg-ob-red-2 text-ob-white font-semibold">
            <RiProhibitedLine size={18} />
            Deshabilitar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
