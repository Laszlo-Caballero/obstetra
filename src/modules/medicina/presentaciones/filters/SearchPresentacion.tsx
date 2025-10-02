'use client';
import { useFilter } from '@/components/context/FilterContext';
import Search from '@/components/ui/search/Search';
import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { FilterPresentacion } from '../types';

export default function SearchPresentacion() {
  const { setFilter } = useFilter<FilterPresentacion>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('search', value);
    },
  });

  return (
    <Search
      placeholder="Buscar presentación..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
