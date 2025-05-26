import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Spinner } from '@/components/spinner';
import { UsersTable } from '@/modules/users/users-table';
import { useUsers } from '@/modules/users/hooks/use-users';
import { DataTableContainer } from '@/components/data-table-container';

function Users() {
  const navigate = useNavigate();
  const { t } = useTranslation('users');
  const { isLoading, data } = useUsers();

  if (isLoading) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <DataTableContainer
      title={t('title')}
      description={t('subtitle')}
      addNewButtonTitle={t('add')}
      onAddClick={() => navigate('/app/users/new')}
    >
      <div className='flex w-full flex-col gap-4'>
        <UsersTable users={data ?? []} />
      </div>
    </DataTableContainer>
  );
}

export { Users };
