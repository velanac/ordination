import { PatientSchema } from '@/types';
import { atom } from 'jotai';

type PatientModal = {
  isOpen: boolean;
  patient: PatientSchema | null;
};

export const patientModal = atom<PatientModal>({
  isOpen: false,
  patient: null,
});
