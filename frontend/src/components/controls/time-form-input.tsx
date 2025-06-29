import { Control, FieldValues, Path } from 'react-hook-form';
import { TimePicker } from './date-form-input/time-picker';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { LocalizeFormMessage } from '../localize-form-message';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  description?: string;
};

function TimeFormInput<T extends FieldValues>({
  name,
  label,
  control,
  description,
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='flex items-center'>
              <TimePicker
                date={field.value}
                setDate={(newDate: Date | undefined) => {
                  if (newDate) {
                    field.onChange(newDate);
                  }
                }}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <LocalizeFormMessage />
        </FormItem>
      )}
    />
  );
}

export { TimeFormInput };
