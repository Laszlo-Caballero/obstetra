import Button from "@/components/ui/button/Button";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Modal from "@/components/ui/modal/Modal";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import TextArea from "@/components/ui/textarea/Textarea";
import React from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuPill, LuTrash2, LuX } from "react-icons/lu";
import { PiWarningBold } from "react-icons/pi";
import { RiProhibitedLine } from "react-icons/ri";

export default function EliminarMedicina() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Deshabilitar Medicina" badge="Acción Critica">
          <LuTrash2 size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <form className="flex flex-col gap-y-4 p-4 ">
        <span className="flex items-center text-sm gap-x-2.5 p-3 bg-ob-orange text-ob-black rounded-xl text-wrap w-[536px]">
          <span>
            <PiWarningBold size={18} />
          </span>
          <span className="font-semibold">
            Estás a punto de inhabilitar una Medicina. El personal no podrá
            registrarla en recetas. Esta acción es irreversible.
          </span>
        </span>
        <div>
          <div className="flex items-center justify-between border-b border-dashed border-ob-gray py-2">
            <span className="text-ob-gray-2">Medicina</span>
            Paracetamol 500mg
          </div>
          <div className="flex items-center justify-between border-b border-dashed border-ob-gray py-2">
            <span className="text-ob-gray-2">Presentacion</span>
            Tableta X 10 Pastillas
          </div>
          <div className="flex items-center justify-between border-b border-dashed border-ob-gray py-2">
            <span className="text-ob-gray-2">Fecha y Hora</span>
            Hoy, 12:30
          </div>
        </div>
        <TextArea
          label="Motivo de Desactivación"
          placeholder="Agregue una nota para el equipo..."
          rows={4}
          className={{ label: "text-sm text-ob-white" }}
        />
      </form>
      <ModalFooter nota="No se eliminará datos historicos">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="font-semibold bg-ob-red-2 text-ob-white">
            <RiProhibitedLine size={18} />
            Deshabilitar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
