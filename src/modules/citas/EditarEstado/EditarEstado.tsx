import Button from "@/components/ui/button/Button";
import DashedInfo from "@/components/ui/dashed-info/DashedInfo";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Modal from "@/components/ui/modal/Modal";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import TextArea from "@/components/ui/textarea/Textarea";
import Toggle from "@/components/ui/toggle/Toggle";
import React from "react";
import { LuCircleDot, LuSave, LuX } from "react-icons/lu";
import { PiWarningBold } from "react-icons/pi";

export default function EditarEstado() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Actualizar estado de la cita" badge="Acción Critica">
          <LuCircleDot size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <form className="flex flex-col gap-y-3 p-4">
        <span className="flex items-center text-sm gap-x-2.5 p-3 bg-ob-orange text-ob-black rounded-xl text-wrap w-[536px]">
          <span>
            <PiWarningBold size={18} />
          </span>
          <span className="font-semibold">
            Estás a punto de cambiar el estado de una Cita. Si esta se desactiva
            no se podrá gestionar.
          </span>
        </span>
        <DashedInfo>
          <span className="text-ob-gray-2">Paciente</span>
          María Lopez
        </DashedInfo>
        <DashedInfo>
          <span className="text-ob-gray-2">ID de Cita</span>
          CIT-1025
        </DashedInfo>
        <DashedInfo>
          <span className="text-ob-gray-2">Programa</span>
          Control PAP
        </DashedInfo>
        <DashedInfo>
          <span className="text-ob-gray-2">Fecha y Hora</span>
          Hoy, 12:30
        </DashedInfo>

        <Toggle
          items={[
            "Programada",
            "Confirmada",
            "Completa",
            "Cancelada",
            "Desactivada",
          ]}
          className={{ background: "bg-ob-blue-3", item: "bg-ob-black-4" }}
        />

        <TextArea
          label="Motivo o Nota (opcional)"
          placeholder="Añadir una Nota para el Historial"
          rows={3}
        />
      </form>

      <ModalFooter nota="Accion permanente al desactivar">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="font-semibold bg-ob-teal text-ob-black ">
            <LuSave size={18} />
            Guardar Cambios
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
