import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Spinner } from '@/components/spinner';
import { ToastService } from '@/lib/toast-service';
import { useUser } from '@/modules/users/hooks/use-user';
import { FormContainer } from '@/components/form-container';
import { useUserDelete } from '@/modules/users/hooks/use-user-delete';
import { ChangePasswordForm } from '@/modules/users/change-password-form';

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
    <FormContainer
      id={id}
      title={data ? data.email : ''}
      description={t('editDescription')}
      onDelete={handleDelete}
    >
      {isLoading && <Spinner />}
      {data && (
        <div>
          <ChangePasswordForm onSubmit={() => {}} />
        </div>
      )}
    </FormContainer>
  );
}

export { UserUpdate };
