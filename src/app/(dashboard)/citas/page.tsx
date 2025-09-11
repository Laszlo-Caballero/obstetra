import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonLink from "@/components/ui/button-link/ButtonLink";
import Button from "@/components/ui/button/Button";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import Title from "@/components/ui/title/Title";
import DetalleCita from "@/modules/citas/Detalle/DetalleCita";
import FiltradoCita from "@/modules/citas/Filtros/FiltradoCita";
import SearchCita from "@/modules/citas/Filtros/SearchCita";
import React from "react";
import { GoHome } from "react-icons/go";
import { LuCalendar, LuDownload, LuPlus } from "react-icons/lu";

export default function AdministrarPage() {
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
            href: "/citas",
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Citas Asignadas"
          description="Revisa y Gestiona las citas: presonal, paciente, rectea, diagnostico, etc"
          icon={<LuCalendar size={16} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="bg-ob-black-2 text-ob-lightblue">
            <LuDownload size={18} />
            Exportar
          </Button>
          <ButtonLink className="text-ob-white bg-ob-blue" href="/citas/crear">
            <LuPlus size={18} />
            Registrar Cita
          </ButtonLink>
        </div>
      </section>

      <InfoContainer className="bg-ob-black-3">
        <div className="flex items-center gap-x-3">
          <SearchCita />
          <FiltradoCita />
        </div>
      </InfoContainer>

      <div className="flex items-start gap-x-4">
        <div className="bg-ob-black-3 h-[189px] w-[75%] rounded-2xl">Tabla</div>
        <DetalleCita />
      </div>
    </div>
  );
}
