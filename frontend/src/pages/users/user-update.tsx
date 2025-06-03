import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Spinner } from '@/components/spinner';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/modules/users/hooks/use-user';
import { DangerZoneForm } from '@/modules/users/danger-zone-form';
import { ChangePasswordForm } from '@/modules/users/change-password-form';
import { GeneraSettingsForm } from '@/modules/users/general-settings-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('users');
  const { isLoading, data } = useUser(id);

  const closePage = () => navigate(-1);

  return (
    <div className='container mx-auto h-full w-full'>
      <div className='py-2 mx-auto flex items-center justify-between '>
        <div className='flex justify-between items-center w-full'>
          <div className='w-full'>
            <h1 className='text-2xl font-bold'>{data?.email}</h1>
            <p className='text-sm text-muted-foreground'>
              {t('editDescription')}
            </p>
          </div>
          <Button variant='ghost' onClick={closePage}>
            <X />
          </Button>
        </div>
      </div>
      <Separator className='my-2 mb-5' />
      <Tabs defaultValue='general'>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='general'>Genaral</TabsTrigger>
          <TabsTrigger value='password'>Change Password</TabsTrigger>
          <TabsTrigger value='danger'>Danger Zone</TabsTrigger>
        </TabsList>
        {isLoading && <Spinner />}
        {data && (
          <>
            <TabsContent value='general'>
              <div>
                <GeneraSettingsForm
                  active={data.active}
                  role={data.role as 'Doctor' | 'SuperAdmin' | 'Admin'}
                />
              </div>
            </TabsContent>
            <TabsContent value='password'>
              <ChangePasswordForm />
            </TabsContent>
            <TabsContent value='danger'>
              <DangerZoneForm />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

export { UserUpdate };
