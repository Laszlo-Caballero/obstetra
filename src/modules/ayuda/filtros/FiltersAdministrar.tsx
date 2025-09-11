"use client";
import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import { LuFlag, LuLayers } from "react-icons/lu";
import { FilterAdministrar } from "../types";
import { Modulo, Prioridad, Tipo } from "@/interface/response.interface";
import Filter from "@/components/ui/filter/Filter";

interface FiltersAdministrarProps {
  modulos: Modulo[];
  prioridades: Prioridad[];
  tipos: Tipo[];
}

export default function FiltersAdministrar({
  modulos,
  prioridades,
  tipos,
}: FiltersAdministrarProps) {
  const { filters, setFilter } = useFilter<FilterAdministrar>();

  return (
    <div className="flex items-center gap-x-2">
      <Search
        placeholder="Buscar por asunto o ID"
        className={{ container: "bg-ob-black-4 rounded-xl" }}
        onSearch={(value) => setFilter("search", value)}
        value={filters.search}
      />
      <Filter
        placeholder="Modulo:"
        icon={<LuLayers />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.moduloId}
        values={[
          { label: "Todas", value: "" },
          ...(modulos?.map((modulo) => {
            return {
              label: modulo.nombre,
              value: modulo.moduloId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("moduloId", value);
        }}
      />

      <Filter
        placeholder="Prioridad:"
        icon={<LuFlag />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.prioridadId}
        values={[
          { label: "Todas", value: "" },
          ...(prioridades?.map((prioridad) => {
            return {
              label: prioridad.nombre,
              value: prioridad.prioridadId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("prioridadId", value);
        }}
      />

      <Filter
        placeholder="Tipo de Consulta:"
        icon={<FaRegDotCircle />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.tipoId}
        values={[
          { label: "Todas", value: "" },
          ...(tipos?.map((tipo) => {
            return {
              label: tipo.nombre,
              value: tipo.tipoId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("tipoId", value);
        }}
      />
    </div>
  );
}
