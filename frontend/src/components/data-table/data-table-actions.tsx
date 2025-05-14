'use client';

import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

function DataTableActions({ onEdit, onDelete }: Props) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const openModal = () => setOpenDialog(true);
  const closeModal = () => setOpenDialog(false);

  const onDeleteHandler = () => {
    onDelete();
    closeModal();
  };

  return (
    <div className='flex items-center justify-end'>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onEdit} className='flex gap-2'>
            <Pencil className='w-3 h-3' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={openModal} className='flex gap-2'>
            <Trash className='w-3 h-3' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmationModal
        isOpen={openDialog}
        onClose={closeModal}
        onDelete={onDeleteHandler}
      />
    </div>
  );
}

export { DataTableActions };
