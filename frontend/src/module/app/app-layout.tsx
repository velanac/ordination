import { Navigate, Outlet } from 'react-router';

import { useProfile } from '@/hooks/use-profile';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { Header } from '@/components/header';
import { ProfileMenu } from '@/components/profile-menu';

const AppLayout = () => {
  const { isLoading, error } = useProfile();

  if (isLoading) {
    return <div className='flex'>Loading...</div>; // Loading state
  }

  if (error) {
    return <Navigate to='/' replace />; // Redirect to sign-in page on error
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex w-full flex-col overflow-hidden'>
        <Header>
          <SidebarTrigger />
          <ProfileMenu />
        </Header>
        <div className='flex w-full h-full'>
          <div className='flex w-full h-full'>
            <div className='flex w-full h-fit overflow-auto'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export { AppLayout };
