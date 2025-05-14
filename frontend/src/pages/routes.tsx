import { createBrowserRouter } from 'react-router';

import { AuthLayout } from '@/modules/auth/auth-layout';
import { SignInPage } from '@/pages/auth/signin-page';
import { AppLayout } from '@/modules/app/app-layout';
import { Dashboard } from '@/pages/app/dashboard';
import { SettingsPage } from '@/pages/app/settings';
import PersonalPage from '@/pages/app/personal';
import { Patients } from '@/pages/patients/patients';
import { PatientNew } from './patients/patient-new';
import { PatientUpdate } from './patients/patient-update';

const routers = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [{ index: true, element: <SignInPage /> }],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'personal', element: <PersonalPage /> },
      {
        path: 'patients',
        element: <Patients />,
      },
      {
        path: 'patients/new',
        element: <PatientNew />,
      },
      {
        path: 'patients/:id',
        element: <PatientUpdate />,
      },
    ],
  },
  {
    path: '/app/settings',
    element: <SettingsPage />,
  },
]);

export default routers;
