import { useProfile } from '@/hooks/use-profile';
import { Navigate, Outlet } from 'react-router';

const AuthLayout = () => {
  const { data, isLoading } = useProfile(); // Replace with actual authentication logic

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <Navigate to='/app' replace />;
  }

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100'>
      <Outlet />
    </div>
  );
};

export { AuthLayout };
