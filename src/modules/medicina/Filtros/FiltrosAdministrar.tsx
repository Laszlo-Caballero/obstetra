"use client";
import { useFilter } from "@/components/context/FilterContext";
import { Categoria, Presentacion } from "@/interface/response.interface";
import React from "react";
import { LuLayers } from "react-icons/lu";
import Filter from "@/components/ui/filter/Filter";
import { FiltersMedicina } from "../types";

interface FiltrosAdministrarProps {
  categorias?: Categoria[];
  presentaciones?: Presentacion[];
}

export default function FiltrosAdministrar({
  categorias,
  presentaciones,
}: FiltrosAdministrarProps) {
  const { filters, setFilter } = useFilter<FiltersMedicina>();
  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Categoria:"
        icon={<LuLayers />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.categoriaId}
        values={[
          { label: "Todas", value: "" },
          ...(categorias?.map((categoria) => {
            return {
              label: categoria.nombre,
              value: categoria.categoriaId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("categoriaId", value);
        }}
      />
      <Filter
        placeholder="Presentacion:"
        icon={<LuLayers />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.presentacionId}
        values={[
          { label: "Todas", value: "" },
          ...(presentaciones?.map((presentacion) => {
            return {
              label: presentacion.nombre,
              value: presentacion.presentacionId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("presentacionId", value);
        }}
      />
    </div>
  );
}
