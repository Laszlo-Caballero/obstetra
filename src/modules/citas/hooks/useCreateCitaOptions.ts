import axios from 'axios';
import {
  Response,
  ResponsePersonal,
  ResponsePrograma,
  ResponseTurno,
} from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import { env } from '@/config/env';
import { useAuth } from '@/components/context/AuthContext';

export const useCreateCitaOptions = () => {
  const { token } = useAuth();

  const { data: personal, isLoading: isLoadingPersonal } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponsePersonal[]>>(
        `${env.url_api}/personal?limit=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return res.data.data;
    },
  });

  const { data: turnos, isLoading: isLoadingTurnos } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponseTurno[]>>(`${env.url_api}/turnos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
  });

  const { data: programas, isLoading: isLoadingProgramas } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponsePrograma[]>>(`${env.url_api}/programa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.data;
    },
  });

  return {
    personal: personal || [],
    turnos: turnos || [],
    programas: programas || [],
    isLoading: isLoadingPersonal || isLoadingTurnos || isLoadingProgramas,
  };
};
