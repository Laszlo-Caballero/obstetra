import Badge from "@/components/ui/badge/Badge";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import SmallCard from "@/components/ui/small-card/SmallCard";
import React from "react";
import {
  LuDownload,
  LuInfo,
  LuPencilLine,
  LuPill,
  LuPrinter,
  LuStethoscope,
  LuTestTube,
} from "react-icons/lu";
import DetallePersonal from "./DetallePersonal";
import ContainerButton from "@/components/ui/modal/container-button/ContainerButton";
import Button from "@/components/ui/button/Button";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import EditarEstado from "../EditarEstado/EditarEstado";

export default function DetalleCita() {
  return (
    <aside className="flex flex-col gap-y-4 bg-ob-black-3 rounded-2xl border border-ob-gray p-4 w-[25%] text-sm">
      <span className="flex items-center gap-x-2">
        <LuInfo size={18} />
        Detalle de la Cita
      </span>
      <span className="flex items-center justify-between text-ob-lightblue bg-ob-gray-5 py-2.5 px-3 rounded-xl ">
        <p>Fecha</p>
        <p>12 Jun 2025, 10:30</p>
      </span>
      <div className="flex flex-col gap-y-2.5 text-sm">
        <InfoContainer>
          <span className="flex items-center gap-x-2  text-ob-white">
            <LuPill size={18} />
            Receta
          </span>
          <SmallCard
            title="Hierro Fumarato 200mg"
            description="1 tableta diaria por 8 semanas"
          >
            <Badge className="bg-ob-black-2 text-ob-gray-2">Oral</Badge>
          </SmallCard>
          <SmallCard title="Acido Folico 5mg" description="1 tableta diaria">
            <Badge className="bg-ob-black-2 text-ob-gray-2">Oral</Badge>
          </SmallCard>
          <span className="rounded-xl bg-ob-black-4 border border-ob-gray py-2.5 px-3 text-ob-white">
            Intrucciones: Tomar con alimentos. Almacenar en un lugar Fresco
          </span>
        </InfoContainer>

        <InfoContainer>
          <span className="flex items-center gap-x-2  text-ob-white">
            <LuTestTube size={18} />
            Análisis de Laboratorio
          </span>
          <SmallCard title="Hemograma">
            <span className="text-xs text-ob-gray-2">
              Sol.: 11 Jun • Resultado: 12 Jun
            </span>
          </SmallCard>
          <SmallCard title="Gucosa en Ayunas">
            <span className="text-xs text-ob-gray-2">
              Sol.: 11 Jun • Resultado: 12 Jun
            </span>
          </SmallCard>
          <SmallCard title="Orina Completa">
            <span className="text-xs text-ob-gray-2">
              Sol.: 11 Jun • Pendiente
            </span>
          </SmallCard>
          <span className="rounded-xl border bg-ob-black-4 border-ob-gray py-2.5 px-3 text-ob-white">
            Intrucciones: Tomar con alimentos. Almacenar en un lugar Fresco
          </span>
        </InfoContainer>

        <InfoContainer>
          <span className="flex items-center gap-x-2  text-ob-white">
            <LuStethoscope size={18} />
            Diagnostico
          </span>
          <p>CIE-10: Z34.0 - Supervisión de primer embarazo normal</p>
          <span className=" bg-ob-black-4 rounded-xl border border-ob-gray py-2.5 px-3 text-ob-white">
            Paciente asintomática. Control según protocolo. Próximo control en 4
            semanas.
          </span>
        </InfoContainer>
      </div>

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
  );
}
