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
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
  officeId: z.string().min(1, 'Office ID is required'),
  startTime: z.date(),
  endTime: z.date(),
});

export const PatientEventPayload = z.object({
  id: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
  patientId: z.string().min(1, 'User ID is required'),
  officeId: z.string().min(1, 'Office ID is required'),
  startTime: z.date(),
  endTime: z.date(),
});

export const PatientForm = z.object({
  id: z.string().optional(),
  patientId: z.string().min(1, 'Patient ID is required'),
});

export type DoctorEventPayload = z.infer<typeof DoctorEventPayload>;
export type PatientEventPayload = z.infer<typeof PatientEventPayload>;
export type PatientFormPayload = z.infer<typeof PatientForm>;
export type OfficeEvent = {
  id: string;
  userId: string;
  patientId: string;
  officeId: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'doctor' | 'patient';
};

export type OfficeWithEvents = {
  id: string;
  name: string;
  description: string;
  events: OfficeEvent[];
};

export type CalendarEvent = {
  id?: number; // Optional ID for background events
  start: Date;
  end: Date;
  title: string;
  type: string;
  release: boolean;
  eventId?: string; // ID originalnog događaja iz baze
};
