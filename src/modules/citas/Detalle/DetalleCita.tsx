import Badge from "@/components/ui/badge/Badge";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import SmallCard from "@/components/ui/small-card/SmallCard";
import React from "react";
import { LuPill, LuStethoscope, LuTestTube } from "react-icons/lu";

export default function DetalleCita() {
  return (
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
  );
}
