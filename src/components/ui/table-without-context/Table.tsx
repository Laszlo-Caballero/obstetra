"use client";

import { useTable } from "@/hooks/useTable";
import { ColumnDef } from "@/interface/table.interface";
import cx from "@/libs/cx";
import Pagination from "../pagination/Pagination";
import { useEffect, useState } from "react";
import { MetadataProps } from "@/components/context/FilterContext";

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

export default function Table<T>({
  columns,
  className,
  data,
  metadata,
  initialMetadata,
  onChangePage,
  value,
  initialData,
}: TableProps<T>) {
  const table = useTable({ columns, data, initialData });
  const [metadataState, setMetadataState] = useState(initialMetadata);

  useEffect(() => {
    if (metadata) {
      setMetadataState(metadata);
    }
  }, [metadata, initialMetadata]);

  return (
    <div
      className={cx(
        "rounded-3xl border border-ob-gray overflow-x-auto",
        className
      )}
    >
      <table className={cx("w-full table-auto")}>
        <thead>
          <tr className="transition-colors bg-ob-black-2">
            {table.getHeaders().map((header, i) => {
              return (
                <th
                  key={i}
                  className="font-medium text-ob-lightblue text-sm text-left p-3 border-b border-ob-gray whitespace-nowrap w-auto max-w-max"
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
              <tr
                key={index}
                className="transition-colors border-y border-ob-gray"
              >
                {row.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      className="p-4 whitespace-nowrap w-auto max-w-max"
                    >
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
