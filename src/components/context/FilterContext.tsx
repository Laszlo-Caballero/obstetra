'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export interface MetadataProps {
  total: number;
  totalPage: number;
  limit: number;
}

interface FilterContextType<T> {
  filters: T;
  setFilter: (key: keyof T, value: T[keyof T]) => void;
  metadata?: MetadataProps;
  setMetadata: (metadata: MetadataProps) => void;
}

const FilterContext = createContext<FilterContextType<unknown> | undefined>(undefined);

interface FilterProviderProps<T> {
  initialFilters: T;
}

export function FilterProvider<T>({
  initialFilters,
  children,
}: PropsWithChildren<FilterProviderProps<T>>) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [metadata, setMetadata] = useState<MetadataProps | undefined>(undefined);

  const setFilter = (key: keyof T, value: T[keyof T]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext value={{ filters, setFilter, metadata, setMetadata }}>{children}</FilterContext>
  );
}

export function useFilter<T>() {
  const context = useContext(FilterContext) as FilterContextType<T> | undefined;
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
}
