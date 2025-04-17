import { Outlet } from 'react-router';

const DashboardLayout = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  );
};

export { DashboardLayout };
