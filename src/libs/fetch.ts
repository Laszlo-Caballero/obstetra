import { env } from "@/config/env";
import { Response } from "@/interface/response.interface";
import axios from "axios";

type ApiMethod = "get" | "post" | "put" | "delete";

export async function fetcher<T>(
  path: string,
  options: ApiMethod
): Promise<Response<T> | null> {
  try {
    const res = await axios[options](`${env.url_api}/${path}`);
    return res.data;
  } catch (error) {
    return null;
  }
}
