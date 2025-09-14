"use client";
import { ResponseGaleria } from "@/interface/response.interface";
import { usePathname } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface GaleryContextProps {
  data: ResponseGaleria;
  setData: Dispatch<SetStateAction<ResponseGaleria>>;
}

const GaleryContext = createContext<GaleryContextProps | undefined>(undefined);

export function GaleryProvider({ children }: PropsWithChildren) {
  const pathName = usePathname();

  const [data, setData] = useState<ResponseGaleria>({
    files: [],
    folders: [],
  });

  return <GaleryContext value={{ data, setData }}>{children}</GaleryContext>;
}

export function useGalery() {
  const context = useContext(GaleryContext);
  if (!context) {
    throw new Error("useGalery must be used within a GaleryProvider");
  }
  return context;
}
