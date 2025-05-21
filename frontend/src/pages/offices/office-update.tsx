import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/spinner';
import { useNavigate, useParams } from 'react-router';
import { FormContainer } from '@/components/form-container';
import { OfficeForm } from '@/modules/offices/office-form';
import { useOffice } from '@/modules/offices/hooks/use-office';

function OfficeUpdate() {
  const navigate = useNavigate();
  const { t } = useTranslation('offices');
  const { id } = useParams();
  const { isLoading, data } = useOffice(id);

  const closePage = () => navigate(-1);

  return (
    <FormContainer
      title={t('edit')}
      description={t('editDescription')}
      onCancelClick={closePage}
    >
      {isLoading && <Spinner />}
      {data && <OfficeForm office={data.data} onSaveSuccess={closePage} />}
    </FormContainer>
  );
}

export { OfficeUpdate };
