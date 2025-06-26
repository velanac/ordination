import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastService } from './toast-service';
import { PatientListItem, PatientSchema } from '@/types';

const apiUrl = '/api/v1/';

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axiosInstance.interceptors.response.use(
  (response) => response.data,
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

const Patients = {
  getAll: () => Requests.get<PatientListItem[]>('/patients'),
  getById: (id: string) => Requests.get<PatientSchema>(`/patients/${id}`),
  create: (patient: PatientSchema) => Requests.post<void>('/patients', patient),
  update: (id: string, patient: PatientSchema) =>
    Requests.patch<void>(`/patients/${id}`, patient),
  delete: (id: string) => Requests.del<void>(`/patients/${id}`),
};

export const agent = {
  Patients,
  // Add other entities like Offices, Doctors, etc. here
};
