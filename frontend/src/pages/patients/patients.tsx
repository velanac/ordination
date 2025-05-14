import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PatientsTable } from '@/modules/patients/patients-table';
import { DataTableContainer } from '@/components/data-table-container';

function Patients() {
  const { t } = useTranslation('patients');
  const navigate = useNavigate();
  return (
    <DataTableContainer
      title={t('title')}
      description={t('description')}
      addNewButtonTitle={t('addPatient')}
      onAddClick={() => navigate('/app/patients/new')}
    >
      <PatientsTable patients={[]} />
    </DataTableContainer>
  );
}

export { Patients };
