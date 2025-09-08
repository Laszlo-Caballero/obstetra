"use client";
import { createContext, useContext, useState } from "react";

type TableContextType<T> = {
  data?: T[];
  refresh: (data?: T[]) => void;
};

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export function TableProvider<T>({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<T[] | undefined>(undefined);

  const refresh = (newData?: T[]) => {
    setData(newData);
  };

  return (
    <TableContext.Provider value={{ data, refresh }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext<T>() {
  const context = useContext<TableContextType<T> | undefined>(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context;
}
