import axios from 'axios';
import { Response, ResponsePersonal } from '@/interface/response.interface';
import { Role } from '@/interface/auth.interface';
import { useQuery } from '@/hooks/useQuery';

export const useCreateUserOptions = () => {
  const { data: roles, isLoading: isLoadingRoles } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<Role[]>>(`${process.env.NEXT_PUBLIC_API_URL}/roles`);
      return res.data.data;
    },
  });

  const { data: personal, isLoading: isLoadingPersonal } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponsePersonal[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/personal/not-user`,
      );
      return res.data.data;
    },
  });

  return {
    roles: roles || [],
    personal: personal || [],
    isLoading: isLoadingRoles || isLoadingPersonal,
  };
};
