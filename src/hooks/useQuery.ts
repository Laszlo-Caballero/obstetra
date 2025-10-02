import { useLoader } from '@/components/context/LoaderContext';
import { env } from '@/config/env';
import { useCallback, useEffect, useRef, useState } from 'react';

interface QueryProps<T> {
  dependencies?: unknown[];
  queryFn: (url: string) => Promise<T>;
  firstRender?: boolean;
}

export function useQuery<T>({ queryFn, dependencies, firstRender = true }: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: '' });
  // const { user } = useAuth();
  const didMount = useRef(false);
  const { setLoading, setOver } = useLoader();
  const prevDependencies = useRef<unknown[]>(undefined);

  const refreshData = (data: T) => {
    setFetch((prev) => ({ ...prev, data }));
  };

  const fetchData = useCallback(async () => {
    try {
      setFetch({
        isLoading: true,
        isError: false,
        error: '',
        data: undefined,
      });
      setLoading();
      const data = await queryFn(env.url_api || '');
      setFetch({ isLoading: false, data, isError: false, error: '' });
    } catch (error: unknown) {
      setFetch({ isLoading: false, isError: true, error: String(error) });
    } finally {
      setOver();
    }
  }, [queryFn, setLoading, setOver]);

  useEffect(() => {
    const newDeps = dependencies || [];
    const prevDeps = prevDependencies.current;

    if (!didMount.current) {
      if (firstRender) {
        fetchData();
      }
    } else {
      const depsChanged = !prevDeps || JSON.stringify(prevDeps) !== JSON.stringify(newDeps);

      if (depsChanged) {
        fetchData();
      }
    }

    prevDependencies.current = newDeps;
    didMount.current = true;
  }, [...(dependencies || [])]);

  return {
    ...fetch,
    refreshData,
    refetch: fetchData,
  };
}
