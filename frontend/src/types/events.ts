import * as z from 'zod';

export type Event = {
  id: string;
  userId: string;
  patientId: string;
  officeId: string;
  officeName: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'doctor' | 'patient';
};

export const DoctorEventPayload = z.object({
  userId: z.string().min(1, 'User ID is required'),
  officeId: z.string().min(1, 'Office ID is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

export const PatientEventPayload = z.object({
  patientId: z.string().min(1, 'User ID is required'),
  officeId: z.string().min(1, 'Office ID is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
});

type DoctorEventPayload = z.infer<typeof DoctorEventPayload>;
type PatientEventPayload = z.infer<typeof PatientEventPayload>;

export type OfficeEvent = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
};

export type OfficeWithEvents = {
  id: string;
  name: string;
  description: string;
  events: OfficeEvent[];
};
