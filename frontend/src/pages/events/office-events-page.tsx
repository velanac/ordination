import { useState } from 'react';

import { X } from 'lucide-react';
import { useSetAtom } from 'jotai';
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

function OfficeEventsPage() {
  const { officeId } = useParams<{ officeId: string }>();
  const setOpen = useSetAtom(isOpen);
  const setStartTime = useSetAtom(startTime);
  const setEndTime = useSetAtom(endTime);
  const setDoctorId = useSetAtom(doctorId);
  const setEventId = useSetAtom(selectedEventId);
  const setPatientStore = useSetAtom(patientSheetStore);
  const { data, isLoading } = useOffice(officeId);
  const [currentView, setCurrentView] = useState<View>('month');
  const [eventTitle, setEventTitle] = useState<string>('');
  const { data: doctorsData, isLoading: isDoctorsLoading } = useDoctors();
  const { data: office, isLoading: isLoadingEvent } = useFilterOfficeEvents(
    officeId!
  );

  const events =
    office && currentView === 'month'
      ? office.events.map((event, index) => {
          return {
            id: index, // Koristimo index za lokalni Event tip
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            title: event.title,
            type: 'doctor',
            release: false,
            eventId: event.id, // Dodajemo eventId za referencu na originalni događaj
          };
        })
      : [];

  const backgroundEvents =
    office && currentView === 'day'
      ? office.events.map((event, index) => ({
          id: index,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: event.title,
          type: 'doctor',
          release: false,
          eventId: event.id, // Dodajemo eventId za referencu na originalni događaj
        }))
      : [];

  if (isLoading || isDoctorsLoading || isLoadingEvent) {
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
              patients={[]}
              officeId={officeId!}
              eventTitle={eventTitle}
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
            if (event.type === 'doctor') {
              const doctorEvent = office?.events.find(
                (e) => e.id === event.eventId
              );

              if (!doctorEvent) return;

              setEventId(doctorEvent.id);
              setDoctorId(doctorEvent.userId);
              setStartTime(event.start);
              setEndTime(event.end);
              setOpen(true);
            }
          }}
          onSelectSlot={(slotInfo: SlotInfo) => {
            setDoctorId(''); // Reset doctor ID
            setStartTime(slotInfo.start);
            setEndTime(slotInfo.end);
            setOpen(true);
          }}
          onCreatePatientEvent={(slotInfo: SlotInfo) => {
            console.log('Creating patient event:', event);
            const doctorEvent = office?.events.find(
              (e) => e.id === slotInfo.resourceId
            );

            setEventTitle(doctorEvent?.title || '');

            setPatientStore({
              isOpen: true,
              startTime: slotInfo.start,
              endTime: slotInfo.end,
              doctorId: doctorEvent?.userId || '',
              patientId: '',
            });
          }}
        />
      </div>
    </div>
  );
}

export { OfficeEventsPage };
