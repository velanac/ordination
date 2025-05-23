import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';

type Props = {
  id?: string;
  title?: string;
  description?: string;
  onDelete?: () => void;
  children: React.ReactNode;
  className?: string;
};

function FormContainer({
  id,
  title,
  description,
  onDelete,
  children,
  className,
}: Props) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const openModal = () => setOpenDialog(true);
  const closeModal = () => setOpenDialog(false);

  const handleDelete = () => {
    onDelete?.();
    closeModal();
  };

  return (
    <div className={cn('container mx-auto h-full w-full', className)}>
      <div className='py-2 px-4  mx-auto flex items-center justify-between '>
        <div className=''>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        {id && (
          <Button type='button' onClick={openModal} variant='outline'>
            <Trash className='size-4' />
          </Button>
        )}
      </div>
      <Separator className='my-2 mb-5' />
      {children}
      <DeleteConfirmationModal
        isOpen={openDialog}
        onClose={closeModal}
        onDelete={handleDelete}
      />
    </div>
  );
}

export { FormContainer };
