import { useTranslation } from 'react-i18next';

function ActionsColumn() {
  const { t } = useTranslation('controls');
  return <div className='w-full text-end'>{t('actions')}</div>;
}

export { ActionsColumn };
