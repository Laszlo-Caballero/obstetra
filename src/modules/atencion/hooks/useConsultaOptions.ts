import axios from 'axios';
import { Response, ResponseMedicina } from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import { env } from '@/config/env';
import { useAuth } from '@/components/context/AuthContext';

export const useConsultaOptions = () => {
  const { token } = useAuth();

  const { data: medicinas, isLoading: isLoadingMedicinas } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponseMedicina[]>>(
        `${env.url_api}/farmacia/medicina`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    },
  });

  return {
    medicinas: medicinas || [],
    isLoading: isLoadingMedicinas,
  };
};
