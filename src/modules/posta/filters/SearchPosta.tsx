"use client";
import { useFilter } from "@/components/context/FilterContext";
import Search from "@/components/ui/search/Search";
import React from "react";
import { FilterPosta } from "../types";

export default function SearchPosta() {
  const { filters, setFilter } = useFilter<FilterPosta>();

  return (
    <Search
      placeholder="Buscar postas..."
      className={{
        container: "max-w-[389px] ml-8",
      }}
      onSearch={(value) => {
        setFilter("search", value);
      }}
      value={filters.search}
    />
  );
}
