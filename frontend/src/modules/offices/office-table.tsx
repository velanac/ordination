import { useMemo, useTransition } from 'react';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

import { OfficeSchema } from '@/types';
import { DataTable } from '@/components/data-table';
import { ActionsColumn } from '@/components/data-table/actions-column';
import { useOfficeDelete } from '@/modules/offices/hooks/use-office-delete';
import { DataTableActions } from '@/components/data-table/data-table-actions';

type Props = {
  offices: OfficeSchema[];
};

function OfficesTable({ offices }: Props) {
  const navigate = useNavigate();
  const deleteAction = useOfficeDelete();
  const { t } = useTranslation('offices');
  const [, startTransition] = useTransition();

  const deletePatient = useMemo(
    () => (id: string) => {
      startTransition(() => {
        deleteAction.mutate(id);
      });
    },
    [deleteAction]
  );

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
              onDelete={() => deletePatient(item.id!)}
              onEdit={() => navigate(`/app/offices/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate, deletePatient, t]
  );

  return <DataTable columns={columns} data={offices} />;
}

export { OfficesTable };
