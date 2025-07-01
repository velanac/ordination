import { useTranslation } from 'react-i18next';

import { FormContainer } from '@/components/form-container';
import { PersonalForm } from '@/modules/personal/personal-form';
import { usePersonal } from '@/modules/personal/hooks/use-personal';
import { Spinner } from '@/components/spinner';

function PersonalPage() {
  const { t } = useTranslation('personal');
  const { data, isLoading } = usePersonal();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <FormContainer title={t('title')} description={t('description')}>
      <PersonalForm personal={data} />
    </FormContainer>
  );
}

export { PersonalPage };
