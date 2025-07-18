import { localizer } from '@/lib/localizer';
import { useEffect, useState } from 'react';
import { Calendar, Event, Navigate, View } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { ArrowBigLeft, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  events: Event[];
};

function AgendaCalendar({ events }: Props) {
  const { i18n } = useTranslation();
  const [culture, setCulture] = useState(i18n.language); // Set culture to srLatn or enUS
  const [currentView, setCurrentView] = useState<View>('agenda'); // Default view can be 'month', 'week', 'day', or 'agenda'
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  // const [scrollTime, setScrollTime] = useState(new Date(1972, 0, 1, 6, 0, 0));
  console.log('Events:', events);

  useEffect(() => {
    setCulture(i18n.language);
  }, [i18n.language]);

  return (
    <Calendar
      className=''
      localizer={localizer}
      culture={culture}
      date={currentDate}
      selectable
      step={5}
      messages={{
        agenda: 'Agenda',
        date: 'Datum', // Promenjen naziv kolone za datum
        time: 'Vreme Dolaska', // Promenjen naziv kolone za vreme
        event: 'Lekar', // Promenjen naziv kolone za događaj
        allDay: 'Ceo dan',
        week: 'Nedelja',
        work_week: 'Radna nedelja',
        day: 'Dan',
        month: 'Mesec',
        previous: 'Prethodni',
        next: 'Sledeći',
        yesterday: 'Juče',
        tomorrow: 'Sutra',
        today: 'Danas',
        noEventsInRange: 'Nema događaja u ovom periodu.',
      }}
      // onSelectEvent={(event) => {
      //   setCurrentDate(new Date(event.startTime)); // Set the current date to the event's start date
      //   setCurrentView('day'); // Change view to day when an event is selected
      //   console.log('Selected event:', event);
      //   const scrollTo = new Date(event.startTime);
      //   scrollTo.setMinutes(scrollTo.getMinutes() - 30);
      //   setScrollTime(scrollTo);
      // }}
      events={events}
      components={{
        toolbar: ({ onNavigate, label }) => (
          <div className='p-2 flex justify-between items-center'>
            <div className='flex gap-2'>
              {currentView === 'day' && (
                <Button
                  onClick={() => setCurrentView('month')}
                  variant='ghost'
                  type='button'
                  className='text-sm'
                >
                  <ArrowBigLeft className='h-4 w-4' />
                </Button>
              )}
              <span className='text-xl font-bold'>{label}</span>
            </div>
            <div className='flex gap-2'>
              <Button
                onClick={() => onNavigate(Navigate.PREVIOUS)}
                variant='ghost'
                type='button'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button onClick={() => onNavigate(Navigate.NEXT)} variant='ghost'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ),
      }}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      view={currentView}
      onView={setCurrentView}
      // scrollToTime={scrollTime}
    />
  );
}

export { AgendaCalendar };
