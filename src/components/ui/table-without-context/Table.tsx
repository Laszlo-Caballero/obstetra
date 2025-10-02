'use client';

import { useTable } from '@/hooks/useTable';
import { ColumnDef } from '@/interface/table.interface';
import cx from '@/libs/cx';
import { MetadataProps } from '@/components/context/FilterContext';

interface TableProps<T> {
  initialData: T[];
  data?: T[];
  columns: ColumnDef<T>[];
  className?: string;
  metadata?: MetadataProps;
  initialMetadata?: MetadataProps;
  onChangePage?: (page: number) => void;
  value?: number;
}

export default function Table<T>({ columns, className, data, initialData }: TableProps<T>) {
  const table = useTable({ columns, data, initialData });

  return (
    <div className={cx('border-ob-gray overflow-x-auto rounded-3xl border', className)}>
      <table className={cx('w-full table-auto')}>
        <thead>
          <tr className="bg-ob-black-2 transition-colors">
            {table.getHeaders().map((header, i) => {
              return (
                <th
                  key={i}
                  className="text-ob-lightblue border-ob-gray w-auto max-w-max border-b p-3 text-left text-sm font-medium whitespace-nowrap"
                >
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {table.getCells().map((row, index) => {
            return (
              <tr key={index} className="border-ob-gray border-y transition-colors">
                {row.map((cell, i) => {
                  return (
                    <td key={i} className="w-auto max-w-max p-4 whitespace-nowrap">
                      {cell}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
