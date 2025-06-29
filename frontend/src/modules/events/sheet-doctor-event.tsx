import { useForm } from 'react-hook-form';

import { useAtom, useAtomValue } from 'jotai';

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
import { endTime, isOpen, startTime } from '@/store/doctor-event-sheet';
import { useEffect } from 'react';
import { useCreateDoctorEvent } from './hooks/use-create-doctor-event';

type Props = {
  doctors: Doctor[];
  officeId: string;
};

function SheetDoctorEvent({ doctors = [], officeId }: Props) {
  const [open, setOpen] = useAtom(isOpen);
  const start = useAtomValue(startTime);
  const end = useAtomValue(endTime);
  const createDoctorEvent = useCreateDoctorEvent();

  const form = useForm<DoctorEventPayload>({
    resolver: zodResolver(DoctorEventPayload),
    defaultValues: {
      userId: '',
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
  }, [form, start, end]);

  const onSubmit = (data: DoctorEventPayload) => {
    createDoctorEvent.mutate(data);
    setOpen(false);
  };

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button variant='outline'>Add Doctor Event</Button>
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
