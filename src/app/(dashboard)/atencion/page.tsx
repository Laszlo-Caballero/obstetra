import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import React from "react";
import { LuHouse } from "react-icons/lu";

export default function AdministrarPage() {
  return (
    <div className="w-full flex flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <LuHouse />,
            href: "/",
          },
          {
            title: "Atencion",
            href: "/atencion/administrar",
          },
        ]}
      />
    </div>
  );
}
