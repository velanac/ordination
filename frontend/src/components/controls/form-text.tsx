import { HTMLInputTypeAttribute } from 'react';

import { Control } from 'react-hook-form';
import { FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { LocalizeFormMessage } from '@/components/localize-form-message';

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
        <FormItem hidden={hidden}>
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
          <LocalizeFormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormText };
