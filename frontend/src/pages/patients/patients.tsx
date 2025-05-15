import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PatientsTable } from '@/modules/patients/patients-table';
import { DataTableContainer } from '@/components/data-table-container';
import { useSetAtom } from 'jotai';
import { patientModal } from '@/store/patients';
import { DatePicker } from '@/components/controls/date-form-input';

function Patients() {
  const navigate = useNavigate();
  const { t } = useTranslation('patients');
  const setModal = useSetAtom(patientModal);

  return (
    <DataTableContainer
      title={t('title')}
      description={t('description')}
      addNewButtonTitle={t('addPatient')}
      onAddClick={() =>
        setModal({ isOpen: true, patientId: null, selectedItem: null })
      }
    >
      <div className='flex w-full flex-col gap-4'>
        <PatientsTable patients={[]} />
        <DatePicker />
      </div>
    </DataTableContainer>
  );
}

export { Patients };
