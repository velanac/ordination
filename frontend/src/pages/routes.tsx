import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/module/auth/auth-layout';
import { SignInPage } from '@/pages/auth/signin-page';
import { AppLayout } from '@/module/app/app-layout';
import { Dashboard } from '@/pages/app/dashboard';
import { SettingsPage } from './app/settings';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignInPage /> }],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: '/app/settings',
    element: <SettingsPage />,
  },
]);

export default routers;
