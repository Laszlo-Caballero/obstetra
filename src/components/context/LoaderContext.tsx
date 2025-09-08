"use client";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Load from "../ui/load/Load";

interface LoaderContextProps {
  setLoading: () => void;
  setOver: () => void;
}

const LoaderContext = createContext<LoaderContextProps | undefined>(undefined);

export default function LoaderProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("LoaderProvider mounted");
  }, []);

  const setLoading = () => {
    setIsLoading(true);
  };

  const setOver = () => {
    setIsLoading(false);
  };

  return (
    <LoaderContext.Provider value={{ setLoading, setOver }}>
      {children}

      {isLoading && <Load />}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }

  return context;
}
