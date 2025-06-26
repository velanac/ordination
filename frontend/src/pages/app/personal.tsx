import { useTranslation } from 'react-i18next';

import { FormContainer } from '@/components/form-container';
import { PersonalForm } from '@/modules/personal/personal-form';
import { usePersonal } from '@/modules/personal/hooks/use-personal';

function PersonalPage() {
  const { t } = useTranslation('personal');
  const { data, isLoading } = usePersonal();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <FormContainer title={t('title')} description={t('description')}>
      <PersonalForm personal={data} />
    </FormContainer>
  );
}

export { PersonalPage };
