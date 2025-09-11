import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonLink from "@/components/ui/button-link/ButtonLink";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import Button from "@/components/ui/button/Button";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import Input from "@/components/ui/input/input";
import Search from "@/components/ui/search/Search";
import Select from "@/components/ui/select/Select";
import TextArea from "@/components/ui/textarea/Textarea";
import Title from "@/components/ui/title/Title";
import CrearPaciente from "@/modules/paciente/crear/CrearPaciente";
import React from "react";
import { GoHome } from "react-icons/go";
import { LuArrowLeft, LuCalendarPlus2, LuPlus } from "react-icons/lu";

export default function CrearPage() {
  return (
    <div className="w-full flex flex-col gap-y-2 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Citas",
            href: "/citas/administrar",
          },
          {
            title: "Crear",
            href: "/citas/crear",
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Registrar cita"
          description="Completa los datos del Paciente, Equpi y Programa"
          icon={<LuCalendarPlus2 size={16} />}
        />
        <ButtonModal className="bg-ob-blue-2" modal={<CrearPaciente />}>
          <LuPlus size={18} />
          Registrar Paciente
        </ButtonModal>
      </section>

      <form className="flex flex-col gap-y-4">
        <InfoContainer>
          <span>Informacion Básica</span>
          <div className="grid grid-cols-2 gap-4">
            <span className="flex flex-col gap-y-1 text-sm text-ob-gray-2">
              Paciente:
              <Search placeholder="Buscar Paciente" />
            </span>
            <Select
              label="Obstetra"
              placeholder="Seleccione Obstetra"
              search="Buscar Obstetra..."
              options={[{ label: "Maria", value: "1" }]}
              className={{ label: "text-sm" }}
            />
            <Input
              label="Fecha"
              placeholder="10/08/2025"
              id="date"
              className={{ label: "text-sm" }}
            />
            <Input
              label="Turno"
              placeholder="10:00 am"
              id="hour"
              className={{ label: "text-sm" }}
            />
            <Select
              label="Programa"
              placeholder="Seleccione Programa"
              search="Buscar Programa..."
              options={[{ label: "Mamografia", value: "1" }]}
              className={{ label: "text-sm" }}
            />
            <Input
              label="Sala"
              placeholder="Sala 1"
              id="room"
              className={{ label: "text-sm" }}
            />
            <TextArea
              label="Notas (opcional)"
              placeholder="Instrucciones para la cita"
              className={{ main: "col-start-1 col-end-3" }}
              rows={3}
            />
          </div>
        </InfoContainer>

        <div className="flex items- justify-end gap-x-3">
          <ButtonLink
            className="border border-ob-gray"
            href="/citas/administrar"
          >
            <LuArrowLeft size={18} />
            Cancelar
          </ButtonLink>
          <ButtonLink className="text-ob-white bg-ob-blue" href="/citas/crear">
            <LuPlus size={18} />
            Registrar Cita
          </ButtonLink>
        </div>
      </form>
    </div>
  );
}
