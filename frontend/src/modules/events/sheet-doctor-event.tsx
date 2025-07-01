import { useForm } from 'react-hook-form';

import { useAtom } from 'jotai';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Doctor } from '@/types';
import { Button } from '@/components/ui/button';
import { DoctorEventPayload } from '@/types/events';
import { zodResolver } from '@hookform/resolvers/zod';
import { DoctorEventForm } from '@/modules/events/doctor-event-form';
import {
  doctorId as doctorIdAtom,
  endTime,
  isOpen,
  selectedEventId,
  startTime,
} from '@/store/doctor-event-sheet-store';
import { useEffect } from 'react';
import { useCreateDoctorEvent } from './hooks/use-create-doctor-event';
import { useUpdateDoctorEvent } from './hooks/use-update-doctor-event';

type Props = {
  doctors: Doctor[];
  officeId: string; // Optional, if you want to pre-select a doctor
};

function SheetDoctorEvent({ doctors = [], officeId }: Props) {
  const [open, setOpen] = useAtom(isOpen);
  const [end, setEnd] = useAtom(endTime);
  const [start, setStart] = useAtom(startTime);
  const [doctorId, setDoctor] = useAtom(doctorIdAtom); // Use the atom value directly
  const [eventId, setEventId] = useAtom(selectedEventId); // Use the atom value directly
  const createDoctorEvent = useCreateDoctorEvent();
  const updateDoctorEvent = useUpdateDoctorEvent();

  const form = useForm<DoctorEventPayload>({
    resolver: zodResolver(DoctorEventPayload),
    defaultValues: {
      id: eventId, // Use the eventId from the atom
      userId: doctorId,
      officeId: officeId,
      startTime: start,
      endTime: end,
    },
  });

  useEffect(() => {
    if (form.getValues('startTime') !== start) {
      form.setValue('startTime', start);
    }

    if (form.getValues('endTime') !== end) {
      form.setValue('endTime', end);
    }

    if (form.getValues('userId') !== doctorId) {
      form.setValue('userId', doctorId!);
    }

    if (form.getValues('id') !== eventId) {
      form.setValue('id', eventId);
    }
  }, [form, start, end, doctorId, eventId]);

  const onSubmit = (data: DoctorEventPayload) => {
    if (!data.id) {
      createDoctorEvent.mutate(data);
      setOpen(false);
    } else {
      updateDoctorEvent.mutate(data);
      setOpen(false);
    }
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
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
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Dodaj Termin</SheetTitle>
          <SheetDescription>
            Dodajte novi termin dolaska lekara u ordinaciju.
          </SheetDescription>
        </SheetHeader>
        <div className='grid flex-1 auto-rows-min gap-6 px-4'>
          <DoctorEventForm form={form} doctors={doctors} />
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

export { SheetDoctorEvent };
