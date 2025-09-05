import React from "react";
import Modal from "@/components/ui/modal-v2/Modal";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuSave, LuTag, LuX } from "react-icons/lu";
import Input from "@/components/ui/input/input";
import TextArea from "@/components/ui/textarea/Textarea";
import ModalHeader from "@/components/ui/modal-v2/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal-v2/modal-title/ModalTitle";
import CloseButton from "@/components/ui/modal-v2/close-button/CloseButton";
import ModalFooter from "@/components/ui/modal-v2/modal-footer/ModalFooter";
import ContainerButton from "@/components/ui/modal-v2/container-button/ContainerButton";
import Button from "@/components/ui/button/Button";

export default function CrearModulo() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Crear Modulo" badge="Basico">
          <HiOutlineSquares2X2 size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <div className="flex flex-col gap-y-3 p-4">
        <span className="text-ob-gray-2 text-sm">
          Agrega un Módulo Basico. Solo necesitas dos datos
        </span>
        <div className="flex flex-col gap-y-1">
          <Input
            label="Nombre del Modulo"
            placeholder="Ingresar Nombre"
            id="name"
            className={{ label: "text-ob-white text-sm" }}
            icon={<LuTag size={18} />}
          />
          <span className="text-ob-gray-2 text-xs">
            Ejemplos: Citas, Laboratorio, Metas
          </span>
        </div>
        <div className="flex flex-col gap-y-1">
          <TextArea
            label="Descripcion"
            placeholder="Ingresar Descripcion..."
            id="description"
            rows={3}
            className={{ label: "text-ob-white text-sm" }}
          />
          <span className="text-ob-gray-2 text-xs">
            Describe el funcionamiento del modulo
          </span>
        </div>
      </div>

      <ModalFooter nota="Se le notificara a todos los administradores">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="font-semibold bg-ob-teal">
            <LuSave size={18} />
            Guardar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
