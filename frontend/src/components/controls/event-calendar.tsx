import { useEffect, useState } from 'react';

import { addHours, subMinutes } from 'date-fns';
import { Calendar, Navigate, SlotInfo, View } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';

import { localizer } from '@/lib/localizer';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, ChevronLeft, ChevronRight } from 'lucide-react';

type Event = {
  id?: number; // Optional ID for background events
  start: Date;
  end: Date;
  title: string;
  type: string;
  release: boolean;
};

const events: Event[] = [
  {
    start: new Date(), // Example start time, 15 minutes ago
    end: addHours(new Date(), 0.15), // Example end time, 1 hour after start
    title: 'Vlado Jovanović',
    type: 'test',
    release: false,
  },
  {
    start: addHours(new Date(), 0.15), // Example start time, 15 minutes ago
    end: addHours(new Date(), 0.3), // Example end time, 1 hour after start
    title: 'Milosav Jovanović',
    type: 'test',
    release: false,
  },
];

const backgroundEvents: Event[] = [
  {
    id: 0,
    start: subMinutes(new Date(), 15),
    end: addHours(new Date(), 1), // Example end time, 1 hour after start
    title: 'Dr Milan Jovanović',
    type: 'test',
    release: false,
  },
];

function EventCalendar() {
  const { i18n } = useTranslation();
  const [culture, setCulture] = useState(i18n.language); // Postavite kulturu na srLatn ili enUS
  const [currentView, setCurrentView] = useState<View>('month'); // Default view can be 'month', 'week', 'day', or 'agenda'
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [scrollTime, setScrollTime] = useState(new Date(1972, 0, 1, 6, 0, 0));

  useEffect(() => {
    // Update culture when language changes
    setCulture(i18n.language);
    // Reset current date to undefined when language changes
    setCurrentDate(new Date());
  }, [i18n.language]);

  const onSelectSlot = (slotInfo: SlotInfo) => {
    console.log('Selected slot:', slotInfo);
    setCurrentDate(slotInfo.start);
    setCurrentView('day'); // Change view to day after selecting a slot
  };

  const today = new Date();

  // start time 8:00
  const min = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    5
  );

  // end time 22:00
  const max = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    22
  );

  return (
    <Calendar
      className='h-64 w-full'
      localizer={localizer}
      culture={culture}
      date={currentDate}
      selectable
      step={5}
      onSelectEvent={(event) => {
        setCurrentDate(event.start); // Set the current date to the event's start date
        setCurrentView('day'); // Change view to day when an event is selected
        console.log('Selected event:', event);
        const scrollTo = new Date(event.start);
        scrollTo.setMinutes(scrollTo.getMinutes() - 30);
        setScrollTime(scrollTo);
      }}
      onSelectSlot={onSelectSlot}
      backgroundEvents={backgroundEvents}
      events={events}
      components={{
        toolbar: ({ onNavigate, label }) => (
          <div className='p-2 flex justify-between items-center'>
            <div className='flex gap-2'>
              {currentView === 'day' && (
                <Button
                  onClick={() => setCurrentView('month')}
                  variant='ghost'
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
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500, margin: '50px' }}
      onNavigate={(date) => {
        setCurrentDate(date);
      }}
      view={currentView}
      onView={setCurrentView}
      min={min}
      max={max} // Example max date
      scrollToTime={scrollTime}
    />
  );
}

export { EventCalendar };
