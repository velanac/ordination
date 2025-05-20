import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function FormSubmit() {
  const { t } = useTranslation('controls');
  return (
    <div className='flex w-full items-center justify-end space-x-4'>
      <Button type='submit'>{t('submit')}</Button>
    </div>
  );
}

export { FormSubmit };
