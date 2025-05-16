'use client';

import { Control } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  description?: string;
};

function FormTextArea<T extends FieldValues>(props: Props<T>) {
  const { name, label, control, description } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='mt-4'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={label} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormTextArea };
