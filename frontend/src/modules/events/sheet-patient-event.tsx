import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { PatientEventPayload, PatientListItem } from '@/types';
import { PatientEventForm } from './patient-event-form';

type Props = {
  patients: PatientListItem[]; // Assuming you have a PatientSchema type defined
  officeId: string; // Optional, if you want to pre-select a doctor
  eventTitle?: string; // Optional, if you want to pre-fill the event title
};

function SheetPatientEvent({ patients, officeId, eventTitle }: Props) {
  const [patiantStore, setPatientStore] = useAtom(patientSheetStore);
  const { isOpen, doctorId, patientId, startTime, endTime, selectedEventId } =
    patiantStore;

  const form = useForm<PatientEventPayload>({
    resolver: zodResolver(PatientEventPayload),
    defaultValues: {
      id: selectedEventId, // Use the eventId from the atom
      userId: doctorId,
      patientId: patientId, // Assuming patientId is set in the store
      officeId: officeId,
      startTime: startTime,
      endTime: endTime,
    },
  });

  useEffect(() => {
    if (form.getValues('startTime') !== startTime) {
      form.setValue('startTime', startTime);
    }

    if (form.getValues('endTime') !== endTime) {
      form.setValue('endTime', endTime);
    }

    if (form.getValues('userId') !== doctorId) {
      form.setValue('userId', doctorId!);
    }

    if (form.getValues('id') !== selectedEventId) {
      form.setValue('id', selectedEventId);
    }

    if (form.getValues('patientId') !== patientId) {
      form.setValue('patientId', patientId!);
    }
  }, [form, doctorId, patientId, startTime, endTime, selectedEventId]);

  const onSubmit = (data: PatientEventPayload) => {
    if (!data.id) {
      //   createDoctorEvent.mutate(data);
      //   setOpen(false);
    } else {
      //   updateDoctorEvent.mutate(data);
      //   setOpen(false);
    }
  };

  return (
    <Sheet
      onOpenChange={(val) => setPatientStore({ ...patiantStore, isOpen: val })}
      open={isOpen}
    >
      {/* <SheetTrigger asChild>
        <Button
          variant='outline'
          onClick={() => {
            setEventId(undefined); // Reset event ID for new event
            setDoctor('');
            setEnd(new Date(new Date().setHours(16, 0, 0, 0)));
            setStart(new Date(new Date().setHours(8, 0, 0, 0))); // Set default start time to 8 AM
            setOpen(true);
          }}
        >
          Add Doctor Event
        </Button>
      </SheetTrigger> */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Rezerviši termin</SheetTitle>
          <SheetDescription>
            Unesi termin za pacijenta kod {eventTitle}
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
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
