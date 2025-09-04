import { FilterProvider } from "@/components/context/FilterContext";
import MapProvider from "@/modules/posta/components/map-provider/MapProvider";
import { FilterPosta } from "@/modules/posta/types";
import React, { PropsWithChildren } from "react";

export default function PostaLayout({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterPosta>
      initialFilters={{
        page: "1",
        regionId: "",
        status: "true",
        search: "",
      }}
    >
      <MapProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
        {children}
      </MapProvider>
    </FilterProvider>
  );
}
