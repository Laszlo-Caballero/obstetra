'use client';
import { useFilter } from '@/components/context/FilterContext';
import Search from '@/components/ui/search/Search';
import React from 'react';
import { useSearch } from '@/hooks/useSearch';
import { FilterPaciente } from '../../types';

export function SearchPacienteByName() {
  const { setFilter } = useFilter<FilterPaciente>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('search', value);
    },
  });

  return (
    <Search
      placeholder="Buscar pacientes por nombre..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}

export function SearchPacienteByDni() {
  const { setFilter } = useFilter<FilterPaciente>();
  const { search, handleSearch } = useSearch({
    onSearch: (value) => {
      setFilter('dni', value);
    },
  });

  return (
    <Search
      placeholder="Buscar pacientes por dni..."
      className={{
        container: 'max-w-[389px]',
      }}
      onSearch={handleSearch}
      value={search}
    />
  );
}
