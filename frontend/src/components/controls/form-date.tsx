import { format, Locale } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Matcher } from 'react-day-picker';
import { srLatn } from 'react-day-picker/locale';
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  description?: string;
  disabled?: Matcher;
  endMonth?: Date;
  startMonth?: Date;
  locale?: Locale;
};

function FormDate<T extends FieldValues>(props: Props<T>) {
  const {
    name,
    label,
    control,
    description,
    disabled,
    endMonth,
    startMonth,
    locale = srLatn,
  } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? (
                    format(field.value, 'PPP', { locale: locale })
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='center'>
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                captionLayout='dropdown'
                locale={locale}
                endMonth={endMonth}
                startMonth={startMonth}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { FormDate };
