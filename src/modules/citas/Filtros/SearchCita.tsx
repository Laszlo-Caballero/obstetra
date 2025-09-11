"use client";

import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import React from "react";
import { FiltersCitas } from "../type";
import { useSearch } from "@/hooks/useSearch";

export default function SearchCita() {
  const { setFilter } = useFilter<FiltersCitas>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter("search", value);
    },
  });
  return (
    <Search
      placeholder="Buscar por paciente, enfermera u obstetra..."
      className={{
        container: "bg-ob-black-4",
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
