import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import Title from "@/components/ui/title/Title";
import React from "react";
import { GoHome } from "react-icons/go";

export default function CrearMeta() {
  return (
    <div className="w-full flex flex-xol gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <GoHome />,
            href: "/",
          },
          {
            title: "Metas",
            href: "/metas/resumen",
          },
          {
            title: "Crear Meta",
            href: "/metas/crear",
          },
        ]}
      />

      <section>
        <Title></Title>
      </section>
    </div>
  );
}
