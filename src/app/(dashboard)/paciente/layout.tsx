import { FilterProvider } from '@/components/context/FilterContext';
import { FilterPaciente } from '@/modules/paciente/types';
import React, { PropsWithChildren } from 'react';

export default function LayoutPaciente({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterPaciente> initialFilters={{ page: '1', status: '', search: '', dni: '' }}>
      {children}
    </FilterProvider>
  );
}
