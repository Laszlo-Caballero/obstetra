"use client";
import { useFilter } from "@/components/context/FilterContext";
import React from "react";
import { FiltersCitas } from "../type";
import Filter from "@/components/ui/filter/Filter";
import { LuCalendarRange, LuCircleDot } from "react-icons/lu";

// interface FiltradoCitaProps{

// }

export default function FiltradoCita() {
  const { filters, setFilter } = useFilter<FiltersCitas>();
  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Fecha"
        icon={<LuCalendarRange />}
        className={{
          container: "min-w-[200px] bg-ob-black-4",
        }}
        // value={filters.categoriaId}
        // values={[
        //   { label: "Todas", value: "" },
        //   ...(categorias?.map((categoria) => {
        //     return {
        //       label: categoria.nombre,
        //       value: categoria.categoriaId.toString(),
        //     };
        //   }) || []),
        // ]}
        // onChange={(value) => {
        //   setFilter("categoriaId", value);
        // }}
      />
      <Filter
        placeholder="Estado"
        icon={<LuCircleDot />}
        className={{
          container: "min-w-[200px] bg-ob-black-4",
        }}
      />
    </div>
  );
}
