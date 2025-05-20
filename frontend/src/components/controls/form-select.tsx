'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  description?: string;
  items: { value: string; label: string }[];
};

function FormSelect<T extends FieldValues>(props: Props<T>) {
  const { name, label, control, description, items } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='w-full'>
              {items.map((e) => (
                <SelectItem key={e.value} value={e.value}>
                  {e.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormSelect };
