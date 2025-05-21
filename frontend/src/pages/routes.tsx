import { createBrowserRouter } from 'react-router';

import PersonalPage from '@/pages/app/personal';
import { Dashboard } from '@/pages/app/dashboard';
import { AppLayout } from '@/modules/app/app-layout';
import { SignInPage } from '@/pages/auth/signin-page';
import { SettingsPage } from '@/pages/app/settings';
import { Patients } from '@/pages/patients/patients';
import { AuthLayout } from '@/modules/auth/auth-layout';
import { Offices } from '@/pages/offices/offices';
import { PatientNew } from '@/pages/patients/patient-new';
import { PatientUpdate } from '@/pages/patients/patient-update';
import { OfficeNew } from './offices/office-new';
import { OfficeUpdate } from './offices/office-update';

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
        path: 'offices',
        element: <Offices />,
      },
      {
        path: 'offices/new',
        element: <OfficeNew />,
      },
      {
        path: 'offices/:id',
        element: <OfficeUpdate />,
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
