import { Response } from '@/interface/response.interface';
import axios from '@/libs/axios';
import { AxiosRequestConfig } from 'axios';

export async function fetcher<T>(
  path: string,
  config?: AxiosRequestConfig<any> | undefined,
): Promise<Response<T> | null> {
  try {
    const res = await axios.get(`${path}`, config);
    return res.data;
  } catch {
    return null;
  }
}
