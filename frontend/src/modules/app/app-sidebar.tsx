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
import { LayoutDashboard, User } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';

// Menu items.
const items = [
  {
    title: 'Dashoard',
    url: '/app',
    icon: LayoutDashboard,
    isActive: (pathname: string) => pathname.endsWith('/app'),
  },
  {
    title: 'Patients',
    url: '/app/patients',
    icon: User,
    isActive: (pathname: string) => pathname.includes('patients'),
  },
];

const AppSidebar = () => {
  const { pathname } = useLocation();
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
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
