import MapProvider from "@/modules/posta/components/map-provider/MapProvider";
import React, { PropsWithChildren } from "react";

export default function PostaLayout({ children }: PropsWithChildren) {
  return (
    <MapProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>
      {children}
    </MapProvider>
  );
}
