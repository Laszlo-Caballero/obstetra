import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import Button from "@/components/ui/button/Button";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Title from "@/components/ui/title/Title";
import DetalleCita from "@/modules/citas/Detalle/DetalleCita";
import DetallePersonal from "@/modules/citas/Detalle/DetallePersonal";
import EditarEstado from "@/modules/citas/EditarEstado/EditarEstado";
import FiltradoCita from "@/modules/citas/Filtros/FiltradoCita";
import SearchCita from "@/modules/citas/Filtros/SearchCita";
import React from "react";
import { GoHome } from "react-icons/go";
import {
  LuCalendar,
  LuDownload,
  LuInfo,
  LuPencilLine,
  LuPlus,
  LuPrinter,
  LuX,
} from "react-icons/lu";

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
            href: "/citas/administrar",
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
          <Button className="text-ob-white">
            <LuPlus size={18} />
            Registrar Cita
          </Button>
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
        <aside className="flex flex-col gap-y-4 bg-ob-black-3 rounded-2xl border border-ob-gray p-4 w-[25%] text-sm">
          <span className="flex items-center gap-x-2">
            <LuInfo size={18} />
            Detalle de la Cita
          </span>
          <span className="flex items-center justify-between text-ob-lightblue bg-ob-gray-5 py-2.5 px-3 rounded-xl ">
            <p>Fecha</p>
            <p>12 Jun 2025, 10:30</p>
          </span>
          <DetalleCita />
          <DetallePersonal />
          <ContainerButton>
            <Button className="bg-ob-black-3 border border-ob-gray text-ob-white ">
              <LuPrinter size={18} />
              Imprimir
            </Button>
            <Button className="bg-ob-blue-3 text-ob-lightblue ">
              <LuDownload size={18} />
              Exportar
            </Button>
            <ButtonModal
              className="bg-ob-blue text-ob-white"
              modal={<EditarEstado />}
            >
              <LuPencilLine size={18} />
              Editar Estado
            </ButtonModal>
          </ContainerButton>
        </aside>
      </div>
    </div>
  );
}
