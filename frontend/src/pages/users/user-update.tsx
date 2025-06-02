import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Spinner } from '@/components/spinner';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/modules/users/hooks/use-user';
import { DangerZoneForm } from '@/modules/users/danger-zone-form';
import { ChangePasswordForm } from '@/modules/users/change-password-form';
import { GeneraSettingsForm } from '@/modules/users/general-settings-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const update = useUserPath();
  // const [disable, setDisable] = useState(false);
  const { t } = useTranslation('users');
  const { isLoading, data } = useUser(id);

  const closePage = () => navigate(-1);

  //   const handleSubmit = (data: UserPayload) => {
  //     setDisable(true);
  //     update.mutate(
  //       { data, id: id! },
  //       {
  //         onSuccess: () => {
  //           ToastService.success('Office updated successfully');
  //           closePage();
  //         },
  //         onError: (err) => {
  //           ToastService.error(`Something went wrong: ${err?.message}`);
  //         },
  //         onSettled: () => {
  //           setDisable(false);
  //         },
  //       }
  //     );
  //   };

  return (
    <div className='container mx-auto h-full w-full'>
      <div className='py-2 mx-auto flex items-center justify-between '>
        <div className=''>
          <h1 className='text-2xl font-bold'>{data?.email}</h1>
          <p className='text-sm text-muted-foreground'>
            {t('editDescription')}
          </p>
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
                <GeneraSettingsForm active={data.active} />
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
