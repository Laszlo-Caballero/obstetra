'use client';

import { useTable } from '@/hooks/useTable';
import { ColumnDef } from '@/interface/table.interface';
import cx from '@/libs/cx';
import Pagination from '../pagination/Pagination';
import { useTableContext } from '@/components/context/TableContext';
import { useEffect, useState } from 'react';
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
  disableFooter?: boolean;
}

export default function Table<T>({
  columns,
  className,
  data,
  metadata,
  initialMetadata,
  onChangePage,
  value,
  initialData,
  disableFooter,
}: TableProps<T>) {
  const { data: contextData, refresh } = useTableContext<T>();

  const table = useTable({ columns, data: contextData, initialData });
  const [metadataState, setMetadataState] = useState(initialMetadata);

  useEffect(() => {
    refresh(data);
  }, [data]);

  useEffect(() => {
    if (metadata) {
      setMetadataState(metadata);
    }
  }, [metadata, initialMetadata]);

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

        {!disableFooter && (
          <tfoot>
            <tr>
              <td className="text-ob-gray-2 w-full p-3 font-medium" colSpan={columns.length - 1}>
                Mostrando <span className="font-bold">1</span> -{' '}
                <span className="font-bold">{metadataState?.limit}</span> de{' '}
                <span className="font-bold">{metadataState?.total}</span> resultados
              </td>

              <td className="text-ob-gray-2 w-full p-3 text-right font-medium">
                <Pagination
                  length={metadataState?.totalPage || 1}
                  onClick={(page) => onChangePage?.(page)}
                  value={value}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
