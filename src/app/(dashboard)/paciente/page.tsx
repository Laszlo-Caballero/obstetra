import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import Button from "@/components/ui/button/Button";
import Title from "@/components/ui/title/Title";
import CrearPaciente from "@/modules/paciente/crear/CrearPaciente";
import React from "react";
import { GoHome } from "react-icons/go";
import { LuUpload, LuUserPlus, LuUsers } from "react-icons/lu";

export default function PacientePage() {
  return (
    <div className="w-full flex flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Paciente",
            href: "/",
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Pacientes"
          description="Registra nuevos pacientes y consulta historiales"
          icon={<LuUsers size={18} />}
        />
        <div className="flex gap-x-1.5">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            <LuUpload className="text-ob-white" size={18} />
            Importar
          </Button>

          <ButtonModal
            className="bg-ob-teal text-ob-black-6"
            modal={<CrearPaciente />}
          >
            <LuUserPlus size={18} />
            Nuevo Paciente
          </ButtonModal>
        </div>
      </section>
    </div>
  );
}
