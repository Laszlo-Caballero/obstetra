import { useMemo } from 'react';

export function useConst<T>(initialValue: T): T {
  const value = useMemo(() => initialValue, [initialValue]);
  return value;
}
