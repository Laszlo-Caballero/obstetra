"use client";
import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import Select from "@/components/ui/select/Select";
import React from "react";
import { FaRegDotCircle } from "react-icons/fa";
import { LuFlag, LuLayers } from "react-icons/lu";
import { FilterAdministrar } from "../types";

export default function FiltersAdministrar() {
  const { filters, setFilter } = useFilter<FilterAdministrar>();

  return (
    <div className="flex items-center gap-x-2">
      <Search
        placeholder="Buscar por asunto o ID"
        className={{ container: "bg-ob-black-4 rounded-xl" }}
        onSearch={(value) => setFilter("search", value)}
        value={filters.search}
      />
      <Select
        placeholder="Modulo"
        search="Buscar Modulos..."
        iconInput={<LuLayers size={18} />}
        options={[
          { label: "Todos", value: "" },
          { label: "Obstetras", value: "1" },
          { label: "Postas", value: "2" },
        ]}
        onChange={(value) => setFilter("moduloId", value)}
        value={filters.moduloId}
      />
      <Select
        placeholder="Prioridad"
        search="Buscar Prioridad..."
        iconInput={<LuFlag size={18} />}
        options={[
          { label: "Todos", value: "" },
          { label: "Alto", value: "1" },
          { label: "Medio", value: "2" },
        ]}
        onChange={(value) => setFilter("prioridadId", value)}
        value={filters.prioridadId}
      />
      <Select
        placeholder="Estado"
        search="Buscar Estado..."
        iconInput={<FaRegDotCircle size={18} />}
        options={[
          { label: "Todos", value: "" },
          { label: "Alto", value: "1" },
          { label: "Medio", value: "2" },
        ]}
        onChange={(value) => setFilter("estadoId", value)}
        value={filters.estadoId}
      />
    </div>
  );
}
