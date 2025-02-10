import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = "https://book-backend-xi.vercel.app/api";

export function Request<T = unknown>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: unknown
): Promise<AxiosResponse<T>> {
  return axios({
    baseURL: BASE_URL,
    url,
    method,
    data,
  });
}
