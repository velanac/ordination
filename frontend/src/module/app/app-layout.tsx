import { Navigate, Outlet } from 'react-router';

import { useProfile } from '@/hooks/use-profile';

const AppLayout = () => {
  const { isLoading, error } = useProfile();

  if (isLoading) {
    return <div className='flex'>Loading...</div>; // Loading state
  }

  if (error) {
    return <Navigate to='/' replace />; // Redirect to sign-in page on error
  }

  return (
    <div className='flex flex-col h-screen'>
      <header className='bg-gray-800 text-white p-4'>
        <h1 className='text-xl'>My App</h1>
      </header>
      <main className='flex-grow p-4'>
        <Outlet />
      </main>
      <footer className='bg-gray-800 text-white p-4 text-center'>
        © 2025 My App
      </footer>
    </div>
  );
};

export { AppLayout };
