import React from "react";
import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import Title from "@/components/ui/title/Title";

import { GoHome } from "react-icons/go";
import { LuDownload, LuPillBottle } from "react-icons/lu";
import Button from "@/components/ui/button/Button";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";
import Detalle from "@/modules/receta/detalle/Detalle";

export default function page() {
  return (
    <div className="flex flex-col w-full gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Perfil",
            href: "/perfil",
          },
          {
            title: "Receta",
            href: "/",
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Historial de recetas"
          description="Consulta, filtra y exporta recetas emitidas por fecha, paciente u obstetra"
          icon={<LuPillBottle size={18} />}
        />
        <div className="flex items-center gap-x-2">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            <LuDownload size={18} />
            Exportar
          </Button>
          <ButtonModal modal={<Detalle></Detalle>}>Detalle</ButtonModal>
        </div>
      </section>
    </div>
  );
}
