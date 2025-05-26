import { createBrowserRouter } from 'react-router';

import { PersonalPage } from '@/pages/app/personal';
import { Dashboard } from '@/pages/app/dashboard';
import { AppLayout } from '@/components/sidebar/app-layout';
import { SignInPage } from '@/pages/auth/signin-page';
import { Patients } from '@/pages/patients/patients';
import { AuthLayout } from '@/modules/auth/auth-layout';
import { Offices } from '@/pages/offices/offices';
import { PatientNew } from '@/pages/patients/patient-new';
import { PatientUpdate } from '@/pages/patients/patient-update';
import { OfficeNew } from '@/pages/offices/office-new';
import { OfficeUpdate } from '@/pages/offices/office-update';
import { ServiceNew } from '@/pages/services/service-new';
import { Services } from '@/pages/services/services';
import { ServiceUpdate } from '@/pages/services/service-update';
import { Users } from '@/pages/users/users';
import { UserNew } from '@/pages/users/user-new';
import { UserUpdate } from '@/pages/users/user-update';

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
        path: 'services',
        element: <Services />,
      },
      {
        path: 'services/new',
        element: <ServiceNew />,
      },
      {
        path: 'services/:id',
        element: <ServiceUpdate />,
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'users/new',
        element: <UserNew />,
      },
      {
        path: 'users/:id',
        element: <UserUpdate />,
      },
    ],
  },
]);

export default routers;
