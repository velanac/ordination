import { useState } from 'react';

import { X } from 'lucide-react';
import { useAtom, useSetAtom } from 'jotai';
import { Link, useParams } from 'react-router';
import { SlotInfo, View } from 'react-big-calendar';

import { Button } from '@/components/ui/button';
import { useDoctors } from '@/hooks/use-doctors';
import { useOffice } from '@/modules/offices/hooks/use-office';
import { EventCalendar } from '@/components/controls/event-calendar';
import { SheetDoctorEvent } from '@/modules/events/sheet-doctor-event';
import {
  doctorId,
  endTime,
  isOpen,
  selectedEventId,
  startTime,
} from '@/store/doctor-event-sheet-store';
import { useFilterOfficeEvents } from '@/modules/events/hooks/use-filter-office-events';
import { SheetPatientEvent } from '@/modules/events/sheet-patient-event';
import { patientSheetStore } from '@/store/patient-event-sheet-store';
import { usePatients } from '@/modules/patients/hooks/use-patients';

function OfficeEventsPage() {
  const { officeId } = useParams<{ officeId: string }>();
  const setOpen = useSetAtom(isOpen);
  const setStartTime = useSetAtom(startTime);
  const setEndTime = useSetAtom(endTime);
  const setDoctorId = useSetAtom(doctorId);
  const setEventId = useSetAtom(selectedEventId);
  const { data, isLoading } = useOffice(officeId);
  const [eventTitle, setEventTitle] = useState<string>('');
  const [patientStore, setPatientStore] = useAtom(patientSheetStore);
  const { data: doctorsData, isLoading: isDoctorsLoading } = useDoctors();
  const { data: patientes = [], isLoading: isLoadingPatients } = usePatients();
  const { events, backgroundEvents, setCurrentView, currentView } =
    useFilterOfficeEvents();

  if (isLoading || isDoctorsLoading || isLoadingPatients) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-full h-full flex-col items-center justify-center p-4'>
      <div className='flex justify-between items-center w-full mb-4'>
        <h2 className='text-2xl font-bold'>{data?.data.name}</h2>
        <Button variant='ghost' asChild>
          <Link to='/app/appointments'>
            <X />
          </Link>
        </Button>
      </div>
      <div className='mb-4 flex justify-end w-full'>
        {currentView === 'day' && (
          <>
            <SheetPatientEvent
              patients={patientes}
              eventTitle={eventTitle}
              startTime={patientStore.startTime}
              endTime={patientStore.endTime}
              officeId={officeId!}
            />
            <SheetDoctorEvent doctors={doctorsData!} officeId={officeId!} />
          </>
        )}
      </div>
      <div className='flex w-full h-[75vh] flex-col items-center justify-center'>
        <EventCalendar
          view={currentView}
          onChangeView={setCurrentView}
          events={events}
          backgroundEvents={backgroundEvents}
          onClickEvent={(event) => {
            // if (event.type === 'doctor') {
            //   const doctorEvent = events.find(
            //     (e) => e.eventId === event.eventId
            //   );
            //   if (!doctorEvent) return;
            //   setEventId(doctorEvent.eventId);
            //   setDoctorId(doctorEvent.);
            //   setStartTime(event.start);
            //   setEndTime(event.end);
            //   setOpen(true);
            // } else if (event.type === 'patient') {
            //   const patientEvent = office?.events.find(
            //     (e) => e.id === event.eventId
            //   );
            //   if (!patientEvent) return;
            //   setPatientStore({
            //     isOpen: true,
            //     startTime: event.start,
            //     selectedEventId: patientEvent.id,
            //     endTime: event.end,
            //     doctorId: patientEvent.userId || '',
            //     patientId: patientEvent.patientId || '',
            //   });
            // }
          }}
          onSelectSlot={(slotInfo: SlotInfo) => {
            setDoctorId(''); // Reset doctor ID
            setStartTime(slotInfo.start);
            setEndTime(slotInfo.end);
            setOpen(true);
          }}
          onCreatePatientEvent={(slotInfo: SlotInfo) => {
            // console.log('Creating patient event:', event);
            // const doctorEvent = office?.events.find(
            //   (e) => e.id === slotInfo.resourceId
            // );
            // setEventTitle(doctorEvent?.title || '');
            // setPatientStore({
            //   isOpen: true,
            //   startTime: slotInfo.start,
            //   endTime: slotInfo.end,
            //   doctorId: doctorEvent?.userId || '',
            //   patientId: '',
            // });
          }}
        />
      </div>
    </div>
  );
}

export { OfficeEventsPage };
