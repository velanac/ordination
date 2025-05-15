import { atom } from 'jotai';

type PatientModal = {
  isOpen: boolean;
  patientId: string | null;
  selectedItem: string | null;
};

export const patientModal = atom<PatientModal>({
  isOpen: false,
  patientId: null as string | null,
  selectedItem: null as string | null,
});
