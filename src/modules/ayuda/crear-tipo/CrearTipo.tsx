import React from "react";
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/ui/input/input";
import TextArea from "@/components/ui/textarea/Textarea";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Button from "@/components/ui/button/Button";

import { LuSave, LuTag, LuX } from "react-icons/lu";
import { FaLaptopMedical } from "react-icons/fa";
import TablaTipo from "../tabla-tipo/TablaTipo";

export default function CrearTipo() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Crear Tipo de Consulta" badge="Basico">
          <FaLaptopMedical size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <div className="flex flex-col gap-y-3 p-4">
        <span className="text-ob-gray-2 text-sm">
          Agrega un Tipo de Consulta Basico. Solo necesitas dos datos
        </span>
        <div className="flex flex-col gap-y-1">
          <Input
            label="Nombre del Tipo de Consulta"
            placeholder="Ingresar Nombre"
            id="name"
            className={{ label: "text-ob-white text-sm" }}
            icon={<LuTag size={18} />}
          />
          <span className="text-ob-gray-2 text-xs">
            Ejemplos: Soporte Tecnico, Seguridad, Error en Página
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
            Describe de que se trata el tipo de consulta
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-y-1.5 p-4">
        <span>Tipo de Consulta Existentes</span>
        <TablaTipo />
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
