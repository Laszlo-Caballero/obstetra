import { useLoader } from "@/components/context/LoaderContext";
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
  const { setLoading, setOver } = useLoader();

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
        setLoading();
        const data = await queryFn(env.url_api || "");
        setFetch({ isLoading: false, data, isError: false, error: "" });
      } catch (error: unknown) {
        setFetch({ isLoading: false, isError: true, error: String(error) });
      } finally {
        setOver();
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
