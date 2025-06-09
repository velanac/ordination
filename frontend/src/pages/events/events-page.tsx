import { AgendaCalendar } from '@/components/controls/agenda-calendar';
import { useOfficesEvents } from '@/modules/events/hooks/use-offices-events';
import { Link } from 'react-router';

function EventsPage() {
  const { data, isLoading } = useOfficesEvents();

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col gap-4'>
        {data?.data.map((office) => (
          <Link
            to={`/app/appointments/${office.id}`}
            key={office.id}
            className='flex flex-col'
          >
            <h1 className='text-3xl font-semibold'>{office.name}</h1>
            <AgendaCalendar events={office.events} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export { EventsPage };
