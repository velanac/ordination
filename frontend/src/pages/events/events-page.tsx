import { AgendaCalendar } from '@/components/controls/agenda-calendar';
import { Spinner } from '@/components/spinner';
import { useOfficesEvents } from '@/modules/events/hooks/use-offices-events';
import { Link } from 'react-router';

function EventsPage() {
  const { data = [], isLoading } = useOfficesEvents();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col gap-4 pt-4'>
        {data?.map((office) => (
          <div key={office.id}>
            <Link
              to={`/app/appointments/${office.id}`}
              key={office.id}
              className='flex flex-col'
            >
              <h1 className='text-3xl font-semibold'>{office.name}</h1>
            </Link>
            <div className='h-[300px] w-full overflow-auto'>
              <AgendaCalendar events={office.events} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { EventsPage };
