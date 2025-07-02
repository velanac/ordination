import { atom } from 'jotai';

export type PatientSheetStore = {
  isOpen: boolean;
  selectedEventId?: string;
  doctorId?: string;
  patientId?: string;
  startTime: Date;
  endTime: Date;
};

export const patientSheetStore = atom<PatientSheetStore>({
  isOpen: false,
  selectedEventId: undefined,
  doctorId: undefined,
  patientId: undefined,
  startTime: new Date(),
  endTime: new Date(),
});
