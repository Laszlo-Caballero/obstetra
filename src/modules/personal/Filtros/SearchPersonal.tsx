'use client';

import React from 'react';
import { FiltersPersonal } from '../type';
import { useFilter } from '@/components/context/FilterContext';
import { useSearch } from '@/hooks/useSearch';
import Search from '@/components/ui/search/Search';

export default function SearchPersonal() {
  const { setFilter } = useFilter<FiltersPersonal>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('search', value);
    },
  });
  return (
    <Search
      placeholder="Buscar personal..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
