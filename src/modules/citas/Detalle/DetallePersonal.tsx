import SmallCard from "@/components/ui/small-card/SmallCard";
import React from "react";
import { LuUsers } from "react-icons/lu";

export default function DetallePersonal() {
  return (
    <div className="felx flex-col gap-y-10 pt-4 border-t border-ob-gray ">
      <span className="flex items-center gap-x-2">
        <LuUsers size={18} />
        Equipo y Paciente
      </span>
      <SmallCard
        title="Paciente"
        description="Ana Morales • 28 años"
        className={{ container: "border-none" }}
      />
      <SmallCard
        title="Enfermera"
        description="Paula Rios"
        className={{ container: "border-none" }}
      />
      <SmallCard
        title="Obstetra"
        description="Dra Sofía León"
        className={{ container: "border-none" }}
      />
    </div>
  );
}
