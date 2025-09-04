import { env } from "@/config/env";
import { useEffect, useRef, useState } from "react";

interface QueryProps<T> {
  dependencies?: unknown[];
  queryFn: (url: string) => Promise<T>;
  firstRender?: boolean;
}

export function useQuery<T>({
  queryFn,
  dependencies,
  firstRender = true,
}: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: "" });
  // const { user } = useAuth();
  const didMount = useRef(false);

  const refreshData = (data: T) => {
    setFetch((prev) => ({ ...prev, data }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetch({
          isLoading: true,
          isError: false,
          error: "",
          data: undefined,
        });
        const data = await queryFn(env.url_api || "");
        setFetch({ isLoading: false, data, isError: false, error: "" });
      } catch (error: unknown) {
        setFetch({ isLoading: false, isError: true, error: String(error) });
      }
    };
    if (!didMount.current) {
      didMount.current = true;
      if (firstRender) {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [...(dependencies || [])]);

  return {
    ...fetch,
    refreshData,
  };
}
