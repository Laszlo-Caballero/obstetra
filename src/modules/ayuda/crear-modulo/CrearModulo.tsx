import React from "react";
import Modal from "@/components/ui/modal/Modal";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuSave, LuTag } from "react-icons/lu";
import Input from "@/components/ui/input/input";
import TextArea from "@/components/ui/textarea/Textarea";

export default function CrearModulo() {
  return (
    <Modal
      title="Crear Modulo"
      badge="Basico"
      button="Guardar"
      nota="Se le notificara a todos los administradores"
      iconButton={<LuSave size={18} />}
      icon={<HiOutlineSquares2X2 size={20} />}
    >
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
    </Modal>
  );
}
