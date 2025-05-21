import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { OfficesTable } from '@/modules/offices/office-table';
import { useOffices } from '@/modules/offices/hooks/use-offices';
import { DataTableContainer } from '@/components/data-table-container';

function Offices() {
  const navigate = useNavigate();
  const { t } = useTranslation('offices');
  const { isLoading, data } = useOffices();

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
      description={t('subtitle')}
      addNewButtonTitle={t('add')}
      onAddClick={() => navigate('/app/offices/new')}
    >
      <div className='flex w-full flex-col gap-4'>
        <OfficesTable offices={data?.data ?? []} />
      </div>
    </DataTableContainer>
  );
}

export { Offices };
