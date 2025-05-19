import { useNavigate } from 'react-router';

import { FormContainer } from '@/components/form-container';
import { PatientForm } from '@/modules/patients/patient-form';

function PatientNew() {
  const navigate = useNavigate();

  const closePage = () => navigate(-1);

  return (
    <FormContainer
      title='New Patient'
      description='Create a new patient'
      onCancelClick={closePage}
    >
      <PatientForm onSaveSuccess={closePage} />
    </FormContainer>
  );
}

export { PatientNew };
