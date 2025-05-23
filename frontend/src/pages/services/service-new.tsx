import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { ServiceSchema } from '@/types';
import { ToastService } from '@/lib/toast-service';
import { FormContainer } from '@/components/form-container';
import { ServiceForm } from '@/modules/services/service-form';
import { useServicePost } from '@/modules/services/hooks/use-service-post';

function ServiceNew() {
  const navigate = useNavigate();
  const create = useServicePost();
  const { t } = useTranslation('services');

  const closePage = () => navigate(-1);

  const handleSubmit = (data: ServiceSchema) => {
    create.mutate(data, {
      onSuccess: () => {
        ToastService.success('Service created successfully');
        closePage();
      },
      onError: (err) => {
        ToastService.error(`Something went wrong: ${err?.message}`);
      },
    });
  };

  return (
    <FormContainer title={t('newService')} description={t('newDescription')}>
      <ServiceForm onCancel={closePage} onSubmit={handleSubmit} />
    </FormContainer>
  );
}

export { ServiceNew };
