import React from "react";
import Modal from "@/components/ui/modal/Modal";
import ModalHeader from "@/components/ui/modal/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal/modal-title/ModalTitle";
import {
  LuCalendar,
  LuCircleDot,
  LuClipboardList,
  LuClock,
  LuHash,
  LuIdCard,
  LuPrinter,
  LuStethoscope,
  LuUser,
  LuX,
} from "react-icons/lu";
import { RiFileDownloadLine } from "react-icons/ri";
import Button from "@/components/ui/button/Button";
import CloseButton from "@/components/ui/modal/close-button/CloseButton";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import SmallCard from "@/components/ui/small-card/SmallCard";
import Badge from "@/components/ui/badge/Badge";

export default function Detalle() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Detalle de Receta RX-981">
          <LuClipboardList size={16} />
        </ModalTitle>
        <div className="flex items-center gap-x-2">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            <LuPrinter size={18} />
            Imprimir
          </Button>
          <Button className="text-ob-white bg-ob-blue-2">
            <RiFileDownloadLine size={18} />
            Descargar PDF
          </Button>
          <CloseButton>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </div>
      </ModalHeader>
      <div className="flex gap-x-4 p-5">
        <section className="flex flex-col gap-y-3">
          <InfoContainer className="p-3 bg-transparent">
            <span className="text-ob-white"> Paciente</span>
            <SmallCard
              title="Nombre"
              icon={<LuUser size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">María López</span>
            </SmallCard>

            <SmallCard
              title="DNI"
              icon={<LuIdCard size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">35216847</span>
            </SmallCard>

            <SmallCard
              title="Edad"
              icon={<LuCalendar size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">29 años</span>
            </SmallCard>
          </InfoContainer>
          <InfoContainer className="p-3 bg-transparent">
            <span className="text-ob-white">Fármacos Indicados</span>
            <SmallCard
              title="Ácido Fólico 5mg"
              description="Dosis: 1 comprimido al día • Duración: 12 semanas"
              className={{ container: "border-b border-dashed " }}
            >
              <Badge className="bg-ob-blue-2 text-ob-lightblue">Vía Oral</Badge>
            </SmallCard>
            <SmallCard
              title="Hierro (sulfato ferroso) 325mg"
              description="Dosis: 1 comprimido al día • Tomar con comida"
              className={{ container: "border-b border-dashed " }}
            >
              <Badge className="bg-ob-blue-2 text-ob-lightblue">Vía Oral</Badge>
            </SmallCard>
            <SmallCard
              title="Paracetamol 500mg"
              description="Dosis: cada 8 horas si hay dolor o fiebre"
              className={{ container: "border-none" }}
            >
              <Badge className="bg-ob-blue-2 text-ob-lightblue">Vía Oral</Badge>
            </SmallCard>
          </InfoContainer>
          <InfoContainer>
            <span className="text-ob-white">Indicaciones Adicionales</span>
            <span className="text-ob-gray-2">
              - Beber 2L de agua al día. - Evitar AINEs salvo indicación médica.
              - Control en 4 semanas.
            </span>
          </InfoContainer>
        </section>
        <section className="flex flex-col gap-y-3 w-[50%]">
          <InfoContainer className="p-3 bg-transparent">
            <span> Detalles de emisión </span>
            <SmallCard
              title="Obstetra"
              icon={<LuStethoscope size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">Dra. Ramos</span>
            </SmallCard>
            <SmallCard
              title="Fecha"
              icon={<LuCalendar size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">18 Ago 2025</span>
            </SmallCard>
            <SmallCard
              title="Hora"
              icon={<LuClock size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">10:42</span>
            </SmallCard>
            <SmallCard
              title="ID"
              icon={<LuHash size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-white">RX-9825</span>
            </SmallCard>
            <SmallCard
              title="Estado"
              icon={<LuCircleDot size={18} className="text-ob-gray-2" />}
              className={{
                container: "border-none p-0.5",
                title: "text-ob-gray-2",
              }}
            >
              <span className="text-ob-gray text-xs">Emitida</span>
            </SmallCard>
          </InfoContainer>
          <InfoContainer className="p-3 bg-transparent"></InfoContainer>
        </section>
      </div>
    </Modal>
  );
}
