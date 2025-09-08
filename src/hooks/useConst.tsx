import { useMemo } from "react";

export function useConst<T>(initialValue: T): T {
  const value = useMemo(() => initialValue, []);
  return value;
}
