import { FilterProvider } from '@/components/context/FilterContext';
import { FiltersUsuarios } from '@/modules/usuarios/type';
import React, { PropsWithChildren } from 'react';

export default function LayoutUsuarios({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FiltersUsuarios>
      initialFilters={{
        page: '1',
        limit: '10',
        search: '',
      }}
    >
      {children}
    </FilterProvider>
  );
}
