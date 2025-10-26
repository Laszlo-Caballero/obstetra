import { FilterProvider } from '@/components/context/FilterContext';
import { FiltersPersonal } from '@/modules/personal/type';
import React, { PropsWithChildren } from 'react';

export default function layout({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FiltersPersonal>
      initialFilters={{
        tipoPersonalId: '',
        postaId: '',
        status: 'true',
        page: '1',
        search: '',
      }}
    >
      {children}
    </FilterProvider>
  );
}
