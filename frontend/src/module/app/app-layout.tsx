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
      <main className='flex flex-col w-full'>
        <Header>
          <SidebarTrigger />
          <ProfileMenu />
        </Header>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export { AppLayout };
