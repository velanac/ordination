import { useAtomValue, useSetAtom } from 'jotai';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePatient } from '@/modules/patients/hooks/use-patient';
import { PatientForm } from '@/modules/patients/patient-form';
import { patientModal } from '@/store/patients';

function PatientModal() {
  const setPatientModal = useSetAtom(patientModal);
  const { isOpen, patient } = useAtomValue(patientModal);
  const { isLoading, data } = usePatient(patient?.id || undefined);
  const patientData = data?.data;

  if (isLoading) {
    return (
      <Dialog
        modal={false}
        open={isOpen}
        onOpenChange={() => setPatientModal({ isOpen: false, patient: null })}
      >
        <DialogContent className='flex flex-col min-w-full h-full'>
          <div className='flex flex-col justify-around h-18 px-4'>
            <DialogTitle>Patiente</DialogTitle>
            <DialogDescription>Patiente datails</DialogDescription>
          </div>
          <div className='w-full h-full'>Loading...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      modal={false}
      open={isOpen}
      onOpenChange={() => setPatientModal({ isOpen: false, patient: null })}
    >
      {/* min-w-full h-full for full screnn */}
      <DialogContent className='flex flex-col min-w-full h-full'>
        <div className='flex flex-col justify-around h-18 px-4'>
          <DialogTitle>Patiente</DialogTitle>
          <DialogDescription>Patiente datails</DialogDescription>
        </div>
        <div className='w-full h-full'>
          <PatientForm defaultValues={patientData} id='1' onSubmit={() => {}} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { PatientModal };
