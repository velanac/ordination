import { useMemo } from 'react';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

import { UserList } from '@/types';
import { DataTable } from '@/components/data-table';
import { ActionsColumn } from '@/components/data-table/actions-column';
import { DataTableActions } from '@/components/data-table/data-table-actions';

type Props = {
  users: UserList[];
};

function UsersTable({ users }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('users');

  const columns: ColumnDef<UserList>[] = useMemo<ColumnDef<UserList>[]>(
    () => [
      {
        header: t('username'),
        accessorKey: 'username',
      },
      {
        header: t('role'),
        accessorKey: 'role',
      },
      {
        id: 'actions',
        header: () => {
          return <ActionsColumn />;
        },
        cell: ({ row }) => {
          const item = row.original;

          return (
            <DataTableActions
              onEdit={() => navigate(`/app/users/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate, t]
  );

  return <DataTable columns={columns} data={users} />;
}

export { UsersTable };
