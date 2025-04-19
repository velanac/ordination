import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/module/auth/auth-layout';
import { SignInPage } from '@/pages/auth/signin-page';
import { AppLayout } from '@/module/app/app-layout';
import { Dashboard } from '@/pages/app/dashboard';

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
]);

export default routers;
