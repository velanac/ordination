import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { OfficeForm } from '@/modules/offices/office-form';
import { FormContainer } from '@/components/form-container';
import { OfficeSchema } from '@/types';
import { useOfficePost } from '@/modules/offices/hooks/use-office-post';
import { ToastService } from '@/lib/toast-service';

function OfficeNew() {
  const navigate = useNavigate();
  const create = useOfficePost();
  const { t } = useTranslation('offices');

  const closePage = () => navigate(-1);

  const handleSubmit = (data: OfficeSchema) => {
    create.mutate(data, {
      onSuccess: () => {
        ToastService.success('Office created successfully');
        closePage();
      },
      onError: (err) => {
        ToastService.error(`Something went wrong: ${err?.message}`);
      },
    });
  };

  return (
    <FormContainer title={t('new')} description={t('newDescription')}>
      <OfficeForm onSubmit={handleSubmit} onCancel={closePage} />
    </FormContainer>
  );
}

export { OfficeNew };
