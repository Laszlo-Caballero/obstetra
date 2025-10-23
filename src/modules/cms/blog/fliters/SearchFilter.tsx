'use client';

import { useFilter } from '@/components/context/FilterContext';
import { FilterInterface } from './filter.interface';
import { useSearch } from '@/hooks/useSearch';
import Search from '@/components/ui/search/Search';

export default function SearchFilter() {
  const { setFilter } = useFilter<FilterInterface>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('search', value);
    },
  });
  return (
    <Search
      placeholder="Buscar blogs por nombre...."
      className={{
        container: 'max-w-[389px]',
      }}
      value={search}
      onSearch={handleSearch}
    />
  );
}
