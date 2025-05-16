import { HTMLInputTypeAttribute } from 'react';

import { Control } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  description?: string;
  type?: HTMLInputTypeAttribute | undefined;
  hidden?: boolean;
};

function FormText<T extends FieldValues>(props: Props<T>) {
  const { name, label, control, description, type, hidden = false } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='mt-4' hidden={hidden}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={label}
              {...field}
              type={type}
              className={cn(type === 'number' ? 'text-right' : '')}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormText };
