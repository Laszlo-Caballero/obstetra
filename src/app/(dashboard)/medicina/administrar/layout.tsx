import { FilterProvider } from "@/components/context/FilterContext";
import { FiltersMedicina } from "@/modules/medicina/types";
import React, { PropsWithChildren } from "react";

export default function LayoutAdministrar({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FiltersMedicina>
      initialFilters={{
        categoriaId: "",
        presentacionId: "",
        status: "true",
        page: "1",
        search: "",
      }}
    >
      {children}
    </FilterProvider>
  );
}
