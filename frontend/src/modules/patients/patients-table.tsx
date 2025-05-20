import { useMemo, useTransition } from 'react';

import { useNavigate } from 'react-router';
import { ColumnDef } from '@tanstack/react-table';

import { PatientSchema } from '@/types';
import { DataTable } from '@/components/data-table';
import { usePatientDelete } from './hooks/use-patient-delete';
import { DataTableActions } from '@/components/data-table/data-table-actions';
import { useTranslation } from 'react-i18next';
import { ActionsColumn } from '@/components/data-table/actions-column';

type Props = {
  patients: PatientSchema[];
};

function PatientsTable({ patients }: Props) {
  const navigate = useNavigate();
  const deleteAction = usePatientDelete();
  const { t } = useTranslation('patients');
  const [, startTransition] = useTransition();

  const deletePatient = useMemo(
    () => (id: string) => {
      startTransition(() => {
        deleteAction.mutate(id);
      });
    },
    [deleteAction]
  );

  const columns: ColumnDef<PatientSchema>[] = useMemo<
    ColumnDef<PatientSchema>[]
  >(
    () => [
      {
        header: t('fullName'),
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div>
              {item.firstName} {item.parentName} {item.lastName}
            </div>
          );
        },
      },
      {
        header: t('email'),
        accessorKey: 'email',
      },
      {
        header: t('city'),
        accessorKey: 'city',
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
              onEdit={() => navigate(`/app/patients/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate, deletePatient, t]
  );

  return <DataTable columns={columns} data={patients} />;
}

export { PatientsTable };
