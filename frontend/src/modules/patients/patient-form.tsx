import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormActions } from '@/components/controls/form-actions';
import { FormDate } from '@/components/controls/form-date';
import { FormSelect } from '@/components/controls/form-select';
import { FormText } from '@/components/controls/form-text';
import { Grid3 } from '@/components/layout/girid3';
import { Grid4 } from '@/components/layout/grid4';
import { Form } from '@/components/ui/form';
import { PatientSchema } from '@/types';
import { useMemo } from 'react';

type Props = {
  id?: string;
  disabled?: boolean;
  defaultValues?: PatientSchema;
  onSubmit: (values: PatientSchema) => void;
  onCancel?: () => void;
};

function PatientForm({
  id,
  disabled,
  defaultValues,
  onSubmit,
  onCancel,
}: Props) {
  const { t } = useTranslation('patients');
  const genderOptions = useMemo(
    () => [
      { value: 'famale', label: t('female') },
      { value: 'male', label: t('male') },
    ],
    [t]
  );
  const dateOfBirth = defaultValues
    ? new Date(defaultValues.dateOfBirth!)
    : new Date();
  const gender = defaultValues ? defaultValues.gender : 'male';

  const form = useForm<PatientSchema>({
    defaultValues: { ...defaultValues, dateOfBirth, gender },
    resolver: zodResolver(PatientSchema),
  });

  return (
    <div className='py-1 px-4 mx-auto w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <Grid3>
            <FormText
              control={form.control}
              name='firstName'
              label={t('firstName')}
            />
            <FormText
              control={form.control}
              name='parentName'
              label={t('parentName')}
            />
            <FormText
              control={form.control}
              name='lastName'
              label={t('lastName')}
            />
          </Grid3>
          <Grid4>
            {/* <DateFormInput
              name='dateOfBirth'
              label={t('birthDate')}
              control={form.control}
              startYear={1900}
              endYear={getYear(new Date())}
            /> */}
            <FormDate
              name='dateOfBirth'
              label={t('birthDate')}
              control={form.control}
            />
            <FormText control={form.control} name='email' label={t('email')} />
            <FormSelect
              name='gender'
              label={t('gender')}
              items={genderOptions}
              control={form.control}
            />
            <FormText control={form.control} name='phone' label={t('phone')} />
          </Grid4>
          <Grid4>
            <div className='col-span-2'>
              <FormText
                control={form.control}
                name='address'
                label={t('address')}
              />
            </div>
            <div className='col-span-'>
              <FormText control={form.control} name='city' label={t('city')} />
            </div>
            <div className='col-span-1/2'>
              <FormText
                control={form.control}
                name='country'
                label={t('country')}
              />
            </div>
          </Grid4>

          <FormActions id={id} disabled={disabled} onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
}

export { PatientForm };
