'use client';
import React from 'react';
import Filter from '@/components/ui/filter/Filter';
import { LuCalendarRange, LuCircleDot } from 'react-icons/lu';

// interface FiltradoCitaProps{

// }

export default function FiltradoCita() {
  // const { filters, setFilter } = useFilter<FiltersCitas>();
  return (
    <div className="flex items-center gap-x-3">
      <Filter
        placeholder="Fecha"
        icon={<LuCalendarRange />}
        className={{
          container: 'bg-ob-black-4 min-w-[200px]',
        }}
        // value={filters.categoriaId}
        // values={[
        //   { label: "Todas", value: "" },
        //   ...(categorias?.map((categoria) => {
        //     return {
        //       label: categoria.nombre,
        //       value: categoria.categoriaId.toString(),
        //     };
        //   }) || []),
        // ]}
        // onChange={(value) => {
        //   setFilter("categoriaId", value);
        // }}
      />
      <Filter
        placeholder="Estado"
        icon={<LuCircleDot />}
        className={{
          container: 'bg-ob-black-4 min-w-[200px]',
        }}
      />
    </div>
  );
}
