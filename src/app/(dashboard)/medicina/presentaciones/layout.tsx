import { FilterProvider } from '@/components/context/FilterContext';
import { FilterPresentacion } from '@/modules/medicina/presentaciones/types';
import { PropsWithChildren } from 'react';

export default function LayoutPresentacion({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterPresentacion> initialFilters={{ limit: 10, page: 1, search: '' }}>
      {children}
    </FilterProvider>
  );
}
