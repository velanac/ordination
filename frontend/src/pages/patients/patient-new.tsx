import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { PatientSchema } from '@/types';
import { ToastService } from '@/lib/toast-service';
import { FormContainer } from '@/components/form-container';
import { PatientForm } from '@/modules/patients/patient-form';
import { usePatientPost } from '@/modules/patients/hooks/use-patient-post';

function PatientNew() {
  const navigate = useNavigate();
  const create = usePatientPost();
  const { t } = useTranslation('patients');

  const closePage = () => navigate(-1);

  const handleSubmit = (data: PatientSchema) => {
    create.mutate(data, {
      onSuccess: () => {
        ToastService.success('Patient created successfully');
        closePage();
      },
      onError: (err) => {
        ToastService.error(`Something went wrong: ${err?.message}`);
      },
    });
  };

  return (
    <FormContainer title={t('newPatient')} description={t('newDescription')}>
      <PatientForm onCancel={closePage} onSubmit={handleSubmit} />
    </FormContainer>
  );
}

export { PatientNew };
