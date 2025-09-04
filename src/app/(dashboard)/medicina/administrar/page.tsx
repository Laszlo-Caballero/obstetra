import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import Button from "@/components/ui/button/Button";
import React from "react";
import { GoHome } from "react-icons/go";
import { LuPill, LuPlus } from "react-icons/lu";

export default function page() {
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
            title: "Perfil",
            href: "/perfil",
          },
          {
            title: "Medicina",
            href: "/",
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <div className="flex items-center text-ob-white font-medium">
          <div className="flex items-start gap-x-2.5">
            <span className=" p-1 border-3 border-ob-teal rounded-xl bg-ob-black-4">
              <LuPill size={18} />
            </span>
            <div className="flex flex-col gap-y-0.5">
              <h2 className="text-xl">Catálogo y Stock de Medicinas</h2>
              <span className="text-sm text-ob-gray-2">
                Crea, importa y administra el inventario de medicamentos.
              </span>
            </div>
          </div>
        </div>
        <Button className="text-ob-black bg-ob-teal">
          <LuPlus size={18} />
          Nueva Medicina
        </Button>
      </section>

      <div className="border border-ob-gray rounded-xl">tabla owo</div>
    </div>
  );
}
