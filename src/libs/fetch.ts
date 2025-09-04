import { Response } from "@/interface/response.interface";
import axios from "@/libs/axios";

export async function fetcher<T>(path: string): Promise<Response<T> | null> {
  try {
    const res = await axios.get(`${path}`);
    return res.data;
  } catch (error) {
    return null;
  }
}
