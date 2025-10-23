'use client';

import { useFilter } from '@/components/context/FilterContext';
import { ResponseBlogCategoria } from '@/interface/response.interface';
import { FilterInterface } from './filter.interface';
import Filter from '@/components/ui/filter/Filter';
import { LuTags } from 'react-icons/lu';

interface FilterCategoryProps {
  categories: ResponseBlogCategoria[];
}

export default function FilterCategory({ categories }: FilterCategoryProps) {
  const { filters, setFilter } = useFilter<FilterInterface>();

  return (
    <Filter
      placeholder="Categoria:"
      icon={<LuTags />}
      className={{
        container: 'min-w-[260px]',
      }}
      value={filters.categorySlug}
      values={[
        { label: 'Todas', value: '' },
        ...categories.map((category) => {
          return {
            label: category.name,
            value: category.slug,
          };
        }),
      ]}
      onChange={(value) => {
        setFilter('categorySlug', value);
      }}
    />
  );
}
