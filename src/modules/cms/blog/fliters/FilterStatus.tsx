'use client';
import { useFilter } from '@/components/context/FilterContext';
import { FilterInterface } from './filter.interface';
import Filter from '@/components/ui/filter/Filter';
import { BsToggleOn } from 'react-icons/bs';
import { StatusType } from '@/interface/blog-response.interface';

export default function FilterStatus() {
  const { filters, setFilter } = useFilter<FilterInterface>();

  return (
    <Filter
      placeholder="Estado:"
      icon={<BsToggleOn />}
      className={{
        container: 'min-w-[153px]',
      }}
      value={filters.status}
      values={[
        { label: 'Todos', value: '' },
        { label: 'Publicado', value: StatusType.PUBLISHED },
        { label: 'Borrador', value: StatusType.DRAFT },
      ]}
      onChange={(value) => setFilter('status', value)}
    />
  );
}
