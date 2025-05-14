'use client';

import { Trash2 } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
  isOpen: boolean;
  onDelete: () => void;
  onClose: () => void;
}

function DeleteConfirmationModal({
  title,
  description,
  isOpen,
  onDelete,
  onClose,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-sm flex flex-col justify-center overflow-y-auto'>
        <DialogTitle>
          <div className='flex gap-2 items-center'>
            <Trash2 className='text-clarity-500' />{' '}
            {title ?? 'Are you absolutely sure?'}
          </div>
        </DialogTitle>
        <DialogDescription>
          {description ??
            `This action cannot be undone. Are you sure you want to permanently
          delete this recort from our servers?`}
        </DialogDescription>
        <DialogFooter>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button variant='destructive' onClick={onDelete}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteConfirmationModal };
