import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import { LayoutDashboard, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/assets/logo.svg';
import { useSidebar } from '@/components/ui/sidebar';

const AppSidebar = () => {
  const { open } = useSidebar();
  const { pathname } = useLocation();
  const { t } = useTranslation('controls');

  const items = useMemo(
    () => [
      {
        title: t('daschboard'),
        url: '/app',
        icon: LayoutDashboard,
        isActive: (pathname: string) => pathname.endsWith('/app'),
      },
      {
        title: t('patientsLink'),
        url: '/app/patients',
        icon: User,
        isActive: (pathname: string) => pathname.includes('patients'),
      },
    ],
    [t]
  );

  return (
    <Sidebar collapsible='icon'>
      {open && (
        <div className='p-4'>
          <img src={Logo} alt='Hero Logo' />
        </div>
      )}
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('application')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive(pathname)}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export { AppSidebar };
