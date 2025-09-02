"use client";

import cx from "@/libs/cx";

interface PaginationProps {
  length: number;
  onClick?: (page: number) => void;
  value?: number;
}

export default function Pagination({
  length,
  onClick,
  value = 1,
}: PaginationProps) {
  const getPages = () => {
    if (length <= 5) {
      return Array.from({ length }, (_, i) => i + 1);
    }

    if (value <= 3) {
      return [1, 2, 3, 4, "...", length];
    }

    if (value >= length - 2) {
      return [1, "...", length - 3, length - 2, length - 1, length];
    }

    return [1, "...", value - 1, value, value + 1, "...", length];
  };

  const pages = getPages();
  return (
    <div className="flex gap-x-2">
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`ellipsis-${i}`}
            className="px-[11px] py-[7px] text-sm font-medium border border-ob-gray rounded-md text-ob-white"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            className={cx(
              `px-[11px] py-[7px] text-sm font-medium border border-ob-gray rounded-md cursor-pointer text-ob-white`,
              p === value && "bg-ob-blue"
            )}
            onClick={() => onClick?.(p as number)}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
