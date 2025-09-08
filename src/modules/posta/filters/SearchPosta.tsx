"use client";
import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import React from "react";
import { FilterPosta } from "../types";
import { useSearch } from "@/hooks/useSearch";

export default function SearchPosta() {
  const { setFilter } = useFilter<FilterPosta>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter("search", value);
    },
  });

  return (
    <Search
      placeholder="Buscar postas..."
      className={{
        container: "max-w-[389px] ml-8",
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
