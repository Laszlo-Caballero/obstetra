import { FilterProvider } from '@/components/context/FilterContext';
import { FilterInterface } from '@/modules/cms/blog/fliters/filter.interface';
import React, { PropsWithChildren } from 'react';

export default function LayoutBlog({ children }: PropsWithChildren) {
  return (
    <FilterProvider<FilterInterface>
      initialFilters={{
        page: 1,
        limit: 10,
        search: '',
        status: '',
        categorySlug: '',
      }}
    >
      {children}
    </FilterProvider>
  );
}
