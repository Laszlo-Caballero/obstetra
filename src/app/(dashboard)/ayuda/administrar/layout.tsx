import { FilterProvider } from "@/components/context/FilterContext";
import { FilterAdministrar } from "@/modules/ayuda/types";
import { PropsWithChildren } from "react";

export default function LayoutAdministrar({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterAdministrar>
      initialFilters={{
        estadoId: "",
        moduloId: "",
        prioridadId: "",
        page: "1",
        search: "",
      }}
    >
      {children}
    </FilterProvider>
  );
}
