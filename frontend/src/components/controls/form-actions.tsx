import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

type Props = {
  id?: string;
  saveTitle?: string;
  disabled?: boolean;
  onCancel?: () => void;
};

function FormActions({ id, disabled, onCancel }: Props) {
  const { t } = useTranslation('controls');

  return (
    <div className='flex w-full items-center justify-end space-x-4'>
      {onCancel && (
        <Button type='button' onClick={onCancel} variant='secondary'>
          {t('cancel')}
        </Button>
      )}
      <Button type='submit' disabled={disabled} variant='default'>
        {id ? t('saveChanges') : t('save')}
      </Button>
    </div>
  );
}

export { FormActions };
