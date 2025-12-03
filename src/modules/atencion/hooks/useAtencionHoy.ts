import axios from 'axios';
import { Response, ResponseCita } from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import { env } from '@/config/env';
import { useAuth } from '@/components/context/AuthContext';

export const useAtencionHoy = () => {
  const { token } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponseCita[]>>(`${env.url_api}/cita/personal/hoy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
  });

  return {
    citas: data || [],
    isLoading,
    error,
    refetch,
  };
};
