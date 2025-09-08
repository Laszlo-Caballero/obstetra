import { useRef, useState } from "react";

interface SearchProps {
  onSearch?: (query: string) => void;
}

export function useSearch({ onSearch }: SearchProps) {
  const [search, setSearch] = useState("");
  const refTimer = useRef<NodeJS.Timeout>(null);

  const handleSearch = (value: string) => {
    if (refTimer.current) clearTimeout(refTimer.current);
    setSearch(value);
    refTimer.current = setTimeout(() => {
      onSearch?.(value);
    }, 300);
  };

  return {
    search,
    handleSearch,
  };
}
