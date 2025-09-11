import { FilterProvider } from "@/components/context/FilterContext";
import { FiltersCitas } from "@/modules/citas/type";
import React, { PropsWithChildren } from "react";

export default function LayoutCitas({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FiltersCitas>
      initialFilters={{
        status: "true",
        page: "1",
        search: "",
      }}
    >
      {children}
    </FilterProvider>
  );
}
