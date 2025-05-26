import { Navigate, Outlet } from 'react-router';

import { Header } from '@/components/header';
import { Spinner } from '@/components/spinner';
import { useProfile } from '@/hooks/use-profile';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ProfileMenu } from '@/components/profile-menu';
import { SelectLocale } from '@/components/controls/select-locale';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const AppLayout = () => {
  const { isLoading, error } = useProfile();

  if (isLoading) {
    return <Spinner />; // Loading state
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
          <div className='flex items-center gap-2'>
            <SelectLocale />
            <ProfileMenu />
          </div>
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
