import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/input";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Modal from "@/components/ui/modal/Modal";
import ModalFooter from "@/components/ui/modal/modal-footer/ModalFooter";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import TextArea from "@/components/ui/textarea/Textarea";
import React from "react";
import {
  LuCalendar,
  LuIdCard,
  LuMapPin,
  LuPhone,
  LuSave,
  LuUser,
  LuX,
} from "react-icons/lu";

export default function () {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Crear paciente" badge="Editar Estado">
          <LuUser size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <form className="grid grid-cols-2 gap-3 p-4">
        <Input
          label="Documento de Identidad"
          id="dni"
          placeholder="123456789"
          icon={<LuIdCard size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Nombres"
          id="name"
          placeholder="Ñepito"
          icon={<LuIdCard size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Apellidos"
          id="lastname"
          placeholder="Ñispe"
          icon={<LuIdCard size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Fecha de nacimiento"
          id="birthday"
          placeholder="dd/mm/aaaa"
          icon={<LuCalendar size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Sexo"
          id="sex"
          placeholder="Femenino, Masculino"
          icon={<LuUser size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Telefono"
          id="phone"
          placeholder="958 154 162"
          icon={<LuPhone size={18} />}
          className={{ input: "placeholder: font-light" }}
        />
        <Input
          label="Dirección"
          id="address"
          placeholder="Calle Numero Distrito"
          icon={<LuMapPin size={18} />}
          className={{
            input: "placeholder: font-light",
            main: "col-start-1 col-end-3",
          }}
        />
        <TextArea
          label="Notas"
          placeholder="Alergias, antecedentes u otra informacion relevante"
          id="notes"
          rows={3}
          className={{ main: "col-start-1 col-end-3" }}
        />
      </form>
      <ModalFooter nota="Al guardar, el paciente se añadirá al padrón.">
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
