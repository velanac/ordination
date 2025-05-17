import { useSetAtom } from 'jotai';
import { useTranslation } from 'react-i18next';

import { patientModal } from '@/store/patients';
import { PatientsTable } from '@/modules/patients/patients-table';
import { usePatients } from '@/modules/patients/hooks/use-patients';
import { DataTableContainer } from '@/components/data-table-container';

function Patients() {
  const { t } = useTranslation('patients');
  const setModal = useSetAtom(patientModal);
  const { isLoading, data } = usePatients();

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Loading...
      </div>
    );
  }

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
        <PatientsTable patients={data?.data ?? []} />
      </div>
    </DataTableContainer>
  );
}

export { Patients };
