import { EventCalendar } from '@/components/controls/event-calendar';

const Dashboard = () => {
  return (
    <div className='flex flex-col w-full h-full p-4'>
      <div className='flex w-full h-screen'>
        <EventCalendar />
      </div>
    </div>
  );
};

export { Dashboard };
