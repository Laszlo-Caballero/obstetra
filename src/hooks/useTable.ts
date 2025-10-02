import { ColumnDef } from '@/interface/table.interface';
import { ReactNode, useCallback, useState, useEffect } from 'react';

interface TableProps<T> {
  data?: T[];
  columns: ColumnDef<T>[];
  initialData: T[];
}

export function useTable<T>({ columns, data, initialData }: TableProps<T>) {
  const [tableData, setTableData] = useState<T[]>(initialData ?? data);

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  useEffect(() => {
    setTableData(initialData);
  }, [initialData]);

  const getHeaders = useCallback(() => {
    return columns.map((column) => column.header || column.headerComponent?.());
  }, [columns, data]);

  const getCells = useCallback(() => {
    return tableData.map((row) => {
      return columns.map((column) => {
        return column.accessorKey ? (row[column.accessorKey] as ReactNode) : column.cell?.({ row });
      });
    });
  }, [columns, tableData, data]);

  const getFooter = useCallback(() => {
    return columns.map((column) => column.footer || column.footerComponent?.());
  }, [columns, data]);

  return {
    getHeaders,
    getCells,
    getFooter,
  };
}
