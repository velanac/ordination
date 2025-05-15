import { useAtom } from 'jotai';

import { patientModal } from '@/store/patients';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { PatientForm } from '@/modules/patients/patient-form';

function PatientModal() {
  const [{ isOpen, patientId, selectedItem }, setState] = useAtom(patientModal);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() =>
        setState({ isOpen: false, patientId: null, selectedItem: null })
      }
    >
      {/* min-w-full h-full for full screnn */}
      <DialogContent className='flex flex-col min-w-full h-full'>
        <div className='flex flex-col justify-around h-18 px-4'>
          <DialogTitle>Patiente</DialogTitle>
          <DialogDescription>Patiente datails</DialogDescription>
        </div>
        <div className='w-full h-full'>
          <PatientForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { PatientModal };
