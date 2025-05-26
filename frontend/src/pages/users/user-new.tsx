import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { FormContainer } from '@/components/form-container';
import { ToastService } from '@/lib/toast-service';
import { useUserPost } from '@/modules/users/hooks/use-user-post';
import { UserSchema } from '@/types';
import { UserForm } from '@/modules/users/user-form';

function UserNew() {
  const create = useUserPost();
  const navigate = useNavigate();
  const { t } = useTranslation('users');

  const closePage = () => navigate(-1);

  const handleSubmit = (data: UserSchema) => {
    create.mutate(data, {
      onSuccess: () => {
        ToastService.success('User created successfully');
        closePage();
      },
      onError: (err) => {
        ToastService.error(`Something went wrong: ${err?.message}`);
      },
    });
  };

  return (
    <FormContainer title={t('newUser')} description={t('newDescription')}>
      <UserForm onCancel={closePage} onSubmit={handleSubmit} />
    </FormContainer>
  );
}

export { UserNew };
