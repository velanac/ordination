import { Spinner } from '@/components/spinner';
import { useNavigate, useParams } from 'react-router';
import { FormContainer } from '@/components/form-container';
import { usePatient } from '@/modules/patients/hooks/use-patient';
import { PatientForm } from '@/modules/patients/patient-form';

function PatientUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, data } = usePatient(id);

  return (
    <FormContainer
      title='Update Patient'
      description='Update patient details'
      onCancelClick={() => navigate(-1)}
    >
      {isLoading && <Spinner />}
      {data && <PatientForm patient={data.data} />}
    </FormContainer>
  );
}

export { PatientUpdate };
