import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Spinner } from '@/components/spinner';
import { ToastService } from '@/lib/toast-service';
import { useUser } from '@/modules/users/hooks/use-user';
import { FormContainer } from '@/components/form-container';
import { useUserDelete } from '@/modules/users/hooks/use-user-delete';
import { ChangePasswordForm } from '@/modules/users/change-password-form';
import { Separator } from '@radix-ui/react-separator';

function UserUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const update = useUserPath();
  const deleteAction = useUserDelete();
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

  const handleDelete = () => {
    deleteAction.mutate(id!);
    ToastService.success('Office deleted successfully');
    closePage();
  };

  return (
    <div className='container mx-auto h-full w-full'>
      <div className='py-2 px-4  mx-auto flex items-center justify-between '>
        <div className=''>
          <h1 className='text-2xl font-bold'>{data?.email}</h1>
          <p className='text-sm text-muted-foreground'>
            {t('editDescription')}
          </p>
        </div>
      </div>
      <Separator className='my-2 mb-5' />
      {isLoading && <Spinner />}
      {data && (
        <div>
          <ChangePasswordForm onSubmit={() => {}} />
        </div>
      )}
    </div>
  );
}

export { UserUpdate };
