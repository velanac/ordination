import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastService } from './toast-service';
import {
  Doctor,
  PatientListItem,
  PatientSchema,
  Personal as PersonalType,
  ServicePayload,
  ServiceResponse,
  UserGeneralSettingsSchema,
  UserList,
  UserPayload,
  UserResponse,
  DoctorEventPayload,
  OfficeWithEvents,
} from '@/types';
import { PersonalFormPayload } from '@/modules/personal/types';

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

const Users = {
  getAll: () => Requests.get<UserList[]>('/users'),
  getById: (id: string) => Requests.get<UserResponse>(`/users/${id}`),
  create: (user: UserPayload) => Requests.post<void>('/users', user),
  update: (id: string, user: UserPayload) =>
    Requests.patch<void>(`/users/${id}`, user),
  updateGeneral: (id: string, general: UserGeneralSettingsSchema) =>
    Requests.patch<void>(`/users/${id}/general`, general),
  delete: (id: string) => Requests.del<void>(`/users/${id}`),
};

const Patients = {
  getAll: () => Requests.get<PatientListItem[]>('/patients'),
  getById: (id: string) => Requests.get<PatientSchema>(`/patients/${id}`),
  create: (patient: PatientSchema) => Requests.post<void>('/patients', patient),
  update: (id: string, patient: PatientSchema) =>
    Requests.patch<void>(`/patients/${id}`, patient),
  delete: (id: string) => Requests.del<void>(`/patients/${id}`),
};

const Services = {
  getAll: () => Requests.get<ServiceResponse[]>('/services'),
  getById: (id: string) => Requests.get<ServicePayload>(`/services/${id}`),
  create: (service: ServicePayload) =>
    Requests.post<void>('/services', service),
  update: (id: string, service: ServicePayload) =>
    Requests.patch<void>(`/services/${id}`, service),
  delete: (id: string) => Requests.del<void>(`/services/${id}`),
};

const Personal = {
  get: () => Requests.get<PersonalType>('/personal'),
  update: (data: PersonalFormPayload) =>
    Requests.patch<void>('/personal', data),
  create: (data: PersonalFormPayload) => Requests.post<void>('/personal', data),
};

const Doctors = {
  getAll: () => Requests.get<Doctor[]>('/doctors'),
};

const Events = {
  getOfficesEvents: () => Requests.get<OfficeWithEvents[]>('/offices-events'),
  createDoctorEvent: (event: DoctorEventPayload) =>
    Requests.post<void>('/events/doctor', event),
  updateDoctorEvent: (event: DoctorEventPayload) =>
    Requests.patch<void>(`/events/doctor/${event.id}`, event),
};

export const agent = {
  Patients,
  Users,
  Services,
  Personal,
  Doctors,
  Events,
};
