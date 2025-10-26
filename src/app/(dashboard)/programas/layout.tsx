import { FilterProvider } from '@/components/context/FilterContext';
import { FiltersPrograma } from '@/modules/programas/type';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FiltersPrograma>
      initialFilters={{
        estado: 'true',
        page: '1',
        search: '',
      }}
    >
      {children}
    </FilterProvider>
  );
}
