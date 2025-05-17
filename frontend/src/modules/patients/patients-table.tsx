import { useMemo, useTransition } from 'react';

import { useNavigate } from 'react-router';
import { ColumnDef } from '@tanstack/react-table';

import { PatientSchema } from '@/types';
import { DataTableActions } from '@/components/data-table/data-table-actions';
import { DataTable } from '@/components/data-table';
import { useSetAtom } from 'jotai';
import { patientModal } from '@/store/patients';

type Props = {
  patients: PatientSchema[];
};

function PatientsTable({ patients }: Props) {
  const navigate = useNavigate();
  const setPatientModal = useSetAtom(patientModal);
  const [, startTransition] = useTransition();
  const columns: ColumnDef<PatientSchema>[] = useMemo<
    ColumnDef<PatientSchema>[]
  >(
    () => [
      {
        header: 'Full Name',
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
        header: 'Email',
        accessorKey: 'email',
      },
      {
        header: 'City',
        accessorKey: 'city',
      },
      {
        id: 'actions',
        header: () => {
          return <div className='w-full text-end'>Actions</div>;
        },
        cell: ({ row }) => {
          const item = row.original;

          return (
            <DataTableActions
              onDelete={() => {}}
              onEdit={() => navigate(`/app/patients/${item.id}`)}
            />
          );
        },
        disableGlobalFilter: true,
        canFilter: false,
      },
    ],
    [navigate]
  );

  return <DataTable columns={columns} data={patients} />;
}

export { PatientsTable };
