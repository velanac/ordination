import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  PersonalFormPayload,
  PersonalFormSchema,
} from '@/modules/personal/types';
import { Personal } from '@/types';
import { Form } from '@/components/ui/form';
import { Grid2 } from '@/components/layout/girid2';
import { Grid3 } from '@/components/layout/girid3';
import { FormText } from '@/components/controls/form-text';
import { FormSubmit } from '@/components/controls/form-submit';
import { usePathPersonal } from '@/modules/personal/hooks/use-path-personal.';
import { usePostPersonal } from '@/modules/personal/hooks/use-post-personal';

interface PersonalFormProps {
  personal?: Personal | null;
}

const PersonalForm = ({ personal }: PersonalFormProps) => {
  const { t } = useTranslation('personal');
  const create = usePostPersonal();
  const path = usePathPersonal();

  const form = useForm<PersonalFormPayload>({
    resolver: zodResolver(PersonalFormSchema),
    defaultValues: {
      titles: personal?.titles || '',
      firstName: personal?.firstName || '',
      lastName: personal?.lastName || '',
      phone: personal?.phone || '',
      address: personal?.address || '',
      city: personal?.city || '',
      state: personal?.state || '',
      country: personal?.country || '',
      postalCode: personal?.postalCode || '',
    },
  });

  const onSubmit = (data: PersonalFormPayload) => {
    if (personal) {
      path.mutate(data);
    } else {
      create.mutate(data);
    }
  };

  return (
    <div className='p-4 mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='w-full md:w-1/6'>
            <FormText
              control={form.control}
              label={t('titles')}
              name='titles'
            />
          </div>
          <Grid2>
            <FormText
              control={form.control}
              name='firstName'
              label={t('firstName')}
            />
            <FormText
              control={form.control}
              name='lastName'
              label={t('lastName')}
            />
          </Grid2>
          <Grid3>
            <FormText control={form.control} name='phone' label={t('phone')} />
            <FormText
              control={form.control}
              name='address'
              label={t('address')}
            />
            <FormText control={form.control} name='city' label={t('city')} />
          </Grid3>
          <Grid3>
            <FormText control={form.control} name='state' label={t('state')} />
            <FormText
              control={form.control}
              name='country'
              label={t('country')}
            />
            <FormText
              control={form.control}
              name='postalCode'
              label={t('postalCode')}
            />
          </Grid3>
          <FormSubmit />
        </form>
      </Form>
    </div>
  );
};

export { PersonalForm };
