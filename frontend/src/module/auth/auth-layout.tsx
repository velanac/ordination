import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
      <Outlet />
    </div>
  );
};

export { AuthLayout };
