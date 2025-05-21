import { Spinner } from '@/components/spinner';
import { useNavigate, useParams } from 'react-router';
import { FormContainer } from '@/components/form-container';
import { usePatient } from '@/modules/patients/hooks/use-patient';
import { PatientForm } from '@/modules/patients/patient-form';
import { useTranslation } from 'react-i18next';

function OfficeUpdate() {
  const navigate = useNavigate();
  const { t } = useTranslation('offices');
  const { id } = useParams();
  const { isLoading, data } = usePatient(id);

  const closePage = () => navigate(-1);

  return (
    <FormContainer
      title={t('edit')}
      description={t('editDescription')}
      onCancelClick={closePage}
    >
      {isLoading && <Spinner />}
      {data && <PatientForm patient={data.data} onSaveSuccess={closePage} />}
    </FormContainer>
  );
}

export { OfficeUpdate };
