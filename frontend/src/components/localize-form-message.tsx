import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';
import { useFormField } from '@/components/ui/form';

function LocalizeFormMessage({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  const { t } = useTranslation('validation');
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : null;

  if (!body) {
    return null;
  }

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {t(body)}
    </p>
  );
}

export { LocalizeFormMessage };
