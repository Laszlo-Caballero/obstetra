'use client';
import { useFilter } from '@/components/context/FilterContext';
import React from 'react';
import { FiltersPrograma } from '../type';
import { useSearch } from '@/hooks/useSearch';
import Search from '@/components/ui/search/Search';

export default function SearchPrograma() {
  const { setFilter } = useFilter<FiltersPrograma>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('searchByName', value);
    },
  });
  return (
    <Search
      placeholder="Buscar por nombre..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
