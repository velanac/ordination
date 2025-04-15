import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/module/auth/auth-layout';
import { SignInPage } from '@/pages/auth/signin-page';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignInPage /> }],
  },
]);

export default routers;
