import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { OfficeForm } from '@/modules/offices/office-form';
import { FormContainer } from '@/components/form-container';

function OfficeNew() {
  const navigate = useNavigate();
  const { t } = useTranslation('offices');

  const closePage = () => navigate(-1);

  return (
    <FormContainer
      title={t('new')}
      description={t('newDescription')}
      onCancelClick={closePage}
    >
      <OfficeForm onSaveSuccess={closePage} />
    </FormContainer>
  );
}

export { OfficeNew };
