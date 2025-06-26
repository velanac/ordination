import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { PatientSchema } from '@/types';
import { Spinner } from '@/components/spinner';
import { ToastService } from '@/lib/toast-service';
import { FormContainer } from '@/components/form-container';
import { PatientForm } from '@/modules/patients/patient-form';
import { usePatient } from '@/modules/patients/hooks/use-patient';
import { usePatientPath } from '@/modules/patients/hooks/use-patient-path';
import { usePatientDelete } from '@/modules/patients/hooks/use-patient-delete';

function PatientUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = usePatientPath();
  const deleteAction = usePatientDelete(id!);
  const [disable, setDisable] = useState(false);
  const { t } = useTranslation('patients');
  const { isLoading, data } = usePatient(id);

  const closePage = () => navigate(-1);

  const handleSubmit = (data: PatientSchema) => {
    setDisable(true);
    update.mutate(
      { data, id: id! },
      {
        onSuccess: () => {
          ToastService.success('Patient updated successfully');
          closePage();
        },
        onError: (err) => {
          ToastService.error(`Something went wrong: ${err?.message}`);
        },
        onSettled: () => {
          setDisable(false);
        },
      }
    );
  };

  const handleDelete = () => {
    deleteAction.mutate();
    ToastService.success('Patient deleted successfully');
    closePage();
  };

  return (
    <FormContainer
      id={id}
      title={t('editPatient')}
      description={t('editDescription')}
      onDelete={handleDelete}
    >
      {isLoading && <Spinner />}
      {data && (
        <PatientForm
          id={data.id}
          disabled={isLoading || disable}
          defaultValues={data}
          onSubmit={handleSubmit}
          onCancel={closePage}
        />
      )}
    </FormContainer>
  );
}

export { PatientUpdate };
