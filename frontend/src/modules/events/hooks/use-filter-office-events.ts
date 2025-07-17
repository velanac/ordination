import { useEffect, useState } from 'react';

import { useParams } from 'react-router';
import { Event, View } from 'react-big-calendar';

import { useOfficesEvents } from './use-offices-events';

const useFilterOfficeEvents = () => {
  const { data, isLoading, error } = useOfficesEvents();
  const { officeId } = useParams<{ officeId: string }>();

  const [currentView, setCurrentView] = useState<View>('month');
  const [events, setEvents] = useState<Event[]>([]);
  const [backgroundEvents, setBackgroundEvents] = useState<Event[]>([]);

  useEffect(() => {
    const officeEvents = data?.find((office) => office.id === officeId)
      ? data?.find((office) => office.id === officeId)?.events ?? []
      : [];

    if (!officeEvents) return;

    if (currentView === 'month') {
      const monthEvents = officeEvents
        .filter((e) => e.type === 'doctor')
        .map((event, index) => {
          return {
            id: index, // Koristimo index za lokalni Event tip
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            title: event.title,
            type: event.type,
            release: false,
            eventId: event.id, // Dodajemo eventId za referencu na originalni događaj
          };
        });
      setEvents(monthEvents);
      setBackgroundEvents([]);
    }

    if (currentView === 'day') {
      const dayEvents = officeEvents
        .filter((e) => e.type === 'patient')
        .map((event, index) => {
          return {
            id: index, // Koristimo index za lokalni Event tip
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            title: event.title,
            type: event.type,
            release: false,
            eventId: event.id, // Dodajemo eventId za referencu na originalni događaj
          };
        });
      const monthEvents = officeEvents
        .filter((e) => e.type === 'doctor')
        .map((event, index) => {
          return {
            id: index, // Koristimo index za lokalni Event tip
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            title: event.title,
            type: event.type,
            release: false,
            eventId: event.id, // Dodajemo eventId za referencu na originalni događaj
          };
        });
      setEvents(dayEvents);
      setBackgroundEvents(monthEvents);
    }
  }, [currentView, data, officeId]);

  return {
    events: events ?? [],
    backgroundEvents: backgroundEvents ?? [],
    isLoading,
    currentView,
    setCurrentView,
    error,
  };
};

export { useFilterOfficeEvents };
