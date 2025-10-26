'use client';
import { ResponsePosta, TipoPersonal } from '@/interface/response.interface';
import React from 'react';
import { FiltersPersonal } from '../type';
import { useFilter } from '@/components/context/FilterContext';
import Filter from '@/components/ui/filter/Filter';
import { LuHospital, LuUser } from 'react-icons/lu';

interface FiltrosPersonalProps {
  tipos?: TipoPersonal[];
  postas?: ResponsePosta[];
}
export default function FiltrosPersonal({ tipos, postas }: FiltrosPersonalProps) {
  const { filters, setFilter } = useFilter<FiltersPersonal>();
  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Tipo Personal:"
        icon={<LuUser />}
        className={{
          container: 'min-w-[260px]',
        }}
        value={filters.tipoPersonalId}
        values={[
          { label: 'Todas', value: '' },
          ...(tipos?.map((tipo) => {
            return {
              label: tipo.nombre,
              value: tipo.tipoPersonalId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter('tipoPersonalId', value);
        }}
      />
      <Filter
        placeholder="Posta:"
        icon={<LuHospital />}
        className={{
          container: 'min-w-[260px]',
        }}
        value={filters.postaId}
        values={[
          { label: 'Todas', value: '' },
          ...(postas?.map((posta) => {
            return {
              label: posta.nombre,
              value: posta.postaId.toString(),
            };
          }) || []),
        ]}
        onChange={(value) => {
          setFilter('postaId', value);
        }}
      />
    </div>
  );
}
