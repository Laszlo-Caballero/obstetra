"use client";
import { useFilter } from "@/components/context/FilterContext";
import Filter from "@/components/ui/filter/Filter";
import { Region } from "@/interface/response.interface";
import React from "react";
import { TbMapPin } from "react-icons/tb";
import { FilterPosta } from "../types";

interface FilterSelectProps {
  regiones?: Region[];
}

export default function FilterSelect({ regiones }: FilterSelectProps) {
  const { filters, setFilter } = useFilter<FilterPosta>();

  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Region:"
        icon={<TbMapPin />}
        className={{
          container: "min-w-[260px]",
        }}
        value={filters.regionId}
        values={[
          { label: "Todas", value: "" },
          ...(regiones?.map((region) => {
            return {
              label: region.nombre,
              value: region.regionId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter("regionId", value);
        }}
      />
      <Filter
        placeholder="Estado:"
        className={{
          container: "min-w-[153px]",
        }}
        value={filters.status}
        values={[
          { label: "Activas", value: "true" },
          { label: "Desactivas", value: "false" },
        ]}
        onChange={(value) => {
          setFilter("status", value);
        }}
      />
    </div>
  );
}
