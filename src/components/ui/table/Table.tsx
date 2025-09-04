"use client";

import { useTable } from "@/hooks/useTable";
import { ColumnDef } from "@/interface/table.interface";
import cx from "@/libs/cx";
import Pagination from "../pagination/Pagination";

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  className?: string;
  total?: number;
  totalPage?: number;
  limit?: number;
}

export default function Table<T>({
  columns,
  className,
  data,
  limit = 10,
  total,
  totalPage,
}: TableProps<T>) {
  // const { data: contextData, refresh } = useTableContext<T>();

  const table = useTable({ columns, data: data });

  // useEffect(() => {
  //   refresh(data);
  // }, [data]);

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

        <tfoot>
          <tr>
            <td
              className="p-3 text-ob-gray-2 font-medium w-full"
              colSpan={columns.length - 1}
            >
              Mostrando <span className="font-bold">1</span> -{" "}
              <span className="font-bold">{limit}</span> de{" "}
              <span className="font-bold">{total}</span> resultados
            </td>

            <td className="p-3 text-ob-gray-2 font-medium w-full text-right">
              <Pagination
                length={totalPage || 1}
                onClick={(page) => console.log("Page:", page)}
                value={1}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
