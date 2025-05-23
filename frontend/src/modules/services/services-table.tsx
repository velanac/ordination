import { useMemo } from 'react';

import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ColumnDef } from '@tanstack/react-table';

import { ServiceSchema } from '@/types';
import { DataTable } from '@/components/data-table';
import { ActionsColumn } from '@/components/data-table/actions-column';
import { DataTableActions } from '@/components/data-table/data-table-actions';

type Props = {
  services: ServiceSchema[];
};

function ServicesTable({ services }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation('services');

  const columns: ColumnDef<ServiceSchema>[] = useMemo<
    ColumnDef<ServiceSchema>[]
  >(
    () => [
      {
        header: t('description'),
        accessorKey: 'description',
      },
      {
        header: t('price'),
        accessorKey: 'price',
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
              onEdit={() => navigate(`/app/services/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate, t]
  );

  return <DataTable columns={columns} data={services} />;
}

export { ServicesTable };
