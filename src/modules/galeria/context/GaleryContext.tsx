'use client';
import { ResponseGaleria } from '@/interface/response.interface';
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface GaleryContextProps {
  data: ResponseGaleria;
  setData: Dispatch<SetStateAction<ResponseGaleria>>;
}

const GaleryContext = createContext<GaleryContextProps | undefined>(undefined);

export function GaleryProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<ResponseGaleria>({
    files: [],
    folders: [],
  });

  return <GaleryContext value={{ data, setData }}>{children}</GaleryContext>;
}

export function useGalery() {
  const context = useContext(GaleryContext);
  if (!context) {
    throw new Error('useGalery must be used within a GaleryProvider');
  }
  return context;
}
