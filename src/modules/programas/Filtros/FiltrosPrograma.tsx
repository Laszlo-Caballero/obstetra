'use client';

import { useFilter } from '@/components/context/FilterContext';
import React from 'react';
import { FiltersPrograma } from '../type';
import Filter from '@/components/ui/filter/Filter';

export default function FiltrosPrograma() {
  const { filters, setFilter } = useFilter<FiltersPrograma>();
  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Estado:"
        className={{
          container: 'min-w-[153px]',
        }}
        value={filters.estado}
        values={[
          { label: 'Activas', value: 'true' },
          { label: 'Desactivas', value: 'false' },
        ]}
        onChange={(value) => {
          setFilter('estado', value);
        }}
      />
    </div>
  );
}
