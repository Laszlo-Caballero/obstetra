"use client";

import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import React from "react";
import { FiltersMedicina } from "../types";
import { useSearch } from "@/hooks/useSearch";

export default function SearchMedicina() {
  const { setFilter } = useFilter<FiltersMedicina>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter("search", value);
    },
  });
  return (
    <Search
      placeholder="Buscar postas..."
      className={{
        container: "max-w-[389px] ",
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
