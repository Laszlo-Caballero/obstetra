'use client';
import { useFilter } from '@/components/context/FilterContext';
import Filter from '@/components/ui/filter/Filter';
import React from 'react';
import { FilterPaciente } from '../../types';

export default function FilterSelect() {
  const { filters, setFilter } = useFilter<FilterPaciente>();

  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Estado:"
        className={{
          container: 'min-w-[153px]',
        }}
        value={filters.status}
        values={[
          { label: 'Activas', value: 'true' },
          { label: 'Desactivas', value: 'false' },
        ]}
        onChange={(value) => {
          setFilter('status', value);
        }}
      />
    </div>
  );
}
