import { useMemo, useTransition } from 'react';

import { useNavigate } from 'react-router';
import { ColumnDef } from '@tanstack/react-table';

import { PatientList } from '@/modules/patients/types';
import { DataTableActions } from '@/components/data-table/data-table-actions';
import { DataTable } from '@/components/data-table';

type Props = {
  patients: PatientList[];
};

function PatientsTable({ patients }: Props) {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();
  const columns: ColumnDef<PatientList>[] = useMemo<ColumnDef<PatientList>[]>(
    () => [
      {
        header: 'Full Name',
        accessorKey: 'fullName',
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
              onEdit={() => navigate(`/app/patients/${item.id.toString()}`)}
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
