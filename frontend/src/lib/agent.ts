import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastService } from './toast-service';

const apiUrl = '/api/v1/';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    if (error instanceof AxiosError) {
      if (error.response) {
        ToastService.error(
          error?.response.data?.message || 'Unexpected error occurred'
        );
      }
    }
    throw error;
  }
);

export const Requests = {
  get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axiosInstance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    axiosInstance.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: object) =>
    axiosInstance.patch<T>(url, body).then(responseBody),
  del: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody),
};
