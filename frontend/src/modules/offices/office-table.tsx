import { useMemo } from 'react';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

import { OfficeSchema } from '@/types';
import { DataTable } from '@/components/data-table';
import { ActionsColumn } from '@/components/data-table/actions-column';
import { DataTableActions } from '@/components/data-table/data-table-actions';

type Props = {
  offices: OfficeSchema[];
};

function OfficesTable({ offices }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('offices');

  const columns: ColumnDef<OfficeSchema>[] = useMemo<ColumnDef<OfficeSchema>[]>(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
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
              onEdit={() => navigate(`/app/offices/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate, t]
  );

  return <DataTable columns={columns} data={offices} />;
}

export { OfficesTable };
