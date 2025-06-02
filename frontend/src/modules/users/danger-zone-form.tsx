import { useState } from 'react';

import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useUserDelete } from '@/modules/users/hooks/use-user-delete';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';

function DangerZoneForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation('users');
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const deleteMutation = useUserDelete();

  const onDelete = () => {
    deleteMutation.mutate(id!, {
      onSuccess: () => {
        navigate('/app/users');
      },
    });
  };

  const closeModal = () => setOpenDialog(false);

  return (
    <div>
      <div className='py-4 mx-auto w-full'>
        <h2 className='text-lg font-semibold'>{t('dangerZone')}</h2>
        <p className='text-sm text-gray-500'>{t('dangerZoneDescription')}</p>
      </div>
      <Separator className='my-4' />
      <div className=' mx-auto w-full'>
        <Card className='border-red-500 bg-red-50'>
          <CardHeader>
            <CardTitle>{t('deleteUser')}</CardTitle>
            <CardDescription>{t('deleteUserDescription')}</CardDescription>
            <CardAction>
              <Button
                variant='destructive'
                type='button'
                onClick={() => setOpenDialog(true)}
              >
                Delete
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </div>
      <DeleteConfirmationModal
        isOpen={openDialog}
        onClose={closeModal}
        onDelete={onDelete}
      />
    </div>
  );
}

export { DangerZoneForm };
