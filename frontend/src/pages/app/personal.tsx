import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { FormContainer } from '@/components/form-container';
import { PersonalForm } from '@/modules/personal/personal-form';
import { usePersonal } from '@/modules/personal/hooks/use-personal';

export default function PersonalPage() {
  const { t } = useTranslation('personal');
  const { data, isLoading } = usePersonal();
  const navidate = useNavigate();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  const personal = data?.data ?? null;

  return (
    <FormContainer
      title={t('title')}
      description={t('description')}
      onCancelClick={() => navidate(-1)}
    >
      <PersonalForm personal={personal} />
    </FormContainer>
  );
}
