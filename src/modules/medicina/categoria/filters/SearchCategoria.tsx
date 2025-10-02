'use client';
import { useFilter } from '@/components/context/FilterContext';
import Search from '@/components/ui/search/Search';
import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { FilterCategoria } from '../types';

export default function SearchCategoria() {
  const { setFilter } = useFilter<FilterCategoria>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('search', value);
    },
  });

  return (
    <Search
      placeholder="Buscar categorías..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
