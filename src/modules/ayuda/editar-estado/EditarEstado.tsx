import Button from '@/components/ui/button/Button';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import TextArea from '@/components/ui/textarea/Textarea';
import Toggle from '@/components/ui/toggle/Toggle';
import React from 'react';
import { FaLaptopMedical } from 'react-icons/fa';
import { LuPaperclip, LuSave, LuX } from 'react-icons/lu';

export default function EditarEstado() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Consulta #4152" badge="Editar Estado">
          <FaLaptopMedical size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <form className="flex flex-col gap-y-3 p-4 text-sm">
        <span className="text-ob-gray-2">
          Actualiza el estado de la consulta y agrega una nota opcional para el historial
        </span>
        <div className="flex flex-col gap-y-1.5">
          <span className="text-ob-white">Estado</span>

          <Toggle
            items={['Nuevo', 'En Progreso', 'Resuelto', 'Cerrado']}
            className={{
              item: 'border-ob-gray rounded-full border',
              background: 'bg-ob-blue-3 rounded-full',
            }}
          />

          <TextArea
            label="Nota"
            placeholder="Describe el Motivo del Cambio"
            rows={4}
            className={{ label: 'text-ob-white' }}
          />

          <div className="flex flex-col gap-y-1.5">
            <span>Adjuntos</span>
            <div className="text-ob-white border-ob-gray bg-ob-black-4 flex items-center gap-x-2 rounded-xl border px-3 py-2.5">
              <LuPaperclip size={18} />
              Agregar Archivo
            </div>
          </div>
        </div>
      </form>
      <ModalFooter nota="Se le notificara al usuario sobre el cambio">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="bg-ob-teal font-semibold">
            <LuSave size={18} />
            Guardar Cambios
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
