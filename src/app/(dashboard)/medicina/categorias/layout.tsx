import { FilterProvider } from '@/components/context/FilterContext';
import { FilterCategoria } from '@/modules/medicina/categoria/types';
import React, { PropsWithChildren } from 'react';

export default function LayoutCategory({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterCategoria>
      initialFilters={{
        limit: 10,
        page: 1,
        search: '',
      }}
    >
      {children}
    </FilterProvider>
  );
}
