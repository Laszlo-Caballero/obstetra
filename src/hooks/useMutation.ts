import { useState } from "react";
import { env } from "@/config/env";
import { useLoader } from "@/components/context/LoaderContext";

interface MutationProps<K, T, E> {
  mutationFn: (data: K, urlApi: string) => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: E) => void;
  disableLoader?: boolean;
}

export function useMutation<K, T = unknown, E = unknown>({
  mutationFn,
  onError,
  onSuccess,
  disableLoader,
}: MutationProps<K, T, E>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: false, error: "" });

  const { setLoading, setOver } = useLoader();

  const urlApi = env.url_api || "";
  const mutate = async (props?: K) => {
    setFetch({ isLoading: true, isError: false, error: "", data: undefined });
    if (!disableLoader) {
      setLoading();
    }
    try {
      const data = await mutationFn(props as K, urlApi);
      setFetch({ isLoading: false, data, isError: false, error: "" });
      onSuccess?.(data);
    } catch (error: unknown) {
      setFetch({ isLoading: false, isError: true, error: String(error) });
      onError?.(error as E);
    } finally {
      setOver();
    }
  };

  return {
    ...fetch,
    mutate,
  };
}
