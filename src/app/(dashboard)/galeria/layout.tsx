import { GaleryProvider } from "@/modules/galeria/context/GaleryContext";
import React, { PropsWithChildren } from "react";

export default function LayoutGalery({ children }: PropsWithChildren) {
  return <GaleryProvider>{children}</GaleryProvider>;
}
