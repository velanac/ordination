import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { patientSheetStore } from '@/store/patient-event-sheet-store';
import { PatientForm, PatientFormPayload, PatientListItem } from '@/types';
import { PatientEventForm } from './patient-event-form';
import { format } from 'date-fns';
import { useCreatePatientEvent } from './hooks/use-create-patient-event';
import { useUpdatePatientEvent } from './hooks/use-update-patient-event';

type Props = {
  eventTitle?: string; // Optional, if you want to pre-fill the event title
  patients: PatientListItem[]; // Assuming you have a PatientSchema type defined
  startTime: Date; // Optional, if you want to pre-fill the start time
  endTime: Date; // Optional, if you want to pre-fill the end time
  officeId: string;
};

function SheetPatientEvent({ patients, eventTitle, officeId }: Props) {
  const [patiantStore, setPatientStore] = useAtom(patientSheetStore);
  const { isOpen, startTime, endTime, patientId, selectedEventId, doctorId } =
    patiantStore;

  const createPatientEvent = useCreatePatientEvent();
  const updatePatientEvent = useUpdatePatientEvent();

  const form = useForm<PatientFormPayload>({
    resolver: zodResolver(PatientForm),
    defaultValues: {
      id: selectedEventId, // Use the eventId from the atom
      patientId: patientId, // Assuming patientId is set in the store
    },
  });

  useEffect(() => {
    if (form.getValues('id') !== selectedEventId) {
      form.setValue('id', selectedEventId);
    }

    if (form.getValues('patientId') !== patientId) {
      form.setValue('patientId', patientId!);
    }
  }, [form, patientId, selectedEventId]);

  const onSubmit = (data: PatientFormPayload) => {
    if (!data.id) {
      console.log('Creating new patient event:', data);
      createPatientEvent.mutate({
        userId: doctorId!,
        startTime: startTime,
        endTime: endTime,
        officeId: officeId,
        patientId: data.patientId,
      });
      //   setOpen(false);
    } else {
      updatePatientEvent.mutate({
        id: data.id,
        userId: doctorId!,
        startTime: startTime,
        endTime: endTime,
        officeId: officeId,
        patientId: data.patientId,
      });
      //   setOpen(false);
    }
  };

  return (
    <Sheet
      onOpenChange={(val) => setPatientStore({ ...patiantStore, isOpen: val })}
      open={isOpen}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rezerviši termin</SheetTitle>
          <SheetDescription>
            Odaberite pacijenta - {eventTitle}
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <div className='text-md font-semibold'>
            {startTime ? format(startTime, 'HH:mm') : ''} -{' '}
            {endTime ? format(endTime, 'HH:mm') : ''}
          </div>
          <PatientEventForm form={form} patients={patients} />
        </div>
        <SheetFooter>
          <Button type='button' onClick={() => form.handleSubmit(onSubmit)()}>
            Snimi
          </Button>
          <SheetClose asChild>
            <Button variant='outline'>Odustani</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export { SheetPatientEvent };
