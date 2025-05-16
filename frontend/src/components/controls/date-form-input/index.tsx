'use client';

import { format, getMonth, getYear, setMonth, setYear } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimePicker } from './time-picker';
import { srLatn } from 'date-fns/locale';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  startYear?: number;
  endYear?: number;
  useTimePicker?: boolean;
}

function DateFormInput<T extends FieldValues>(props: Props<T>) {
  const {
    name,
    label,
    control,
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()) + 100,
    useTimePicker = false,
  } = props;

  const months = Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i, 1), 'LLLL', { locale: srLatn })
  );
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );
  const stringFormat = useTimePicker ? 'PPP HH:mm:ss' : 'PPP';

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon />
                  {field.value ? (
                    format(field.value, stringFormat, { locale: srLatn })
                  ) : (
                    <span>{label}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <div className='flex justify-between p-2'>
                  <Select
                    onValueChange={(month: string) => {
                      const newDate = setMonth(
                        field.value,
                        months.indexOf(month)
                      );
                      field.onChange(newDate);
                    }}
                    value={months[getMonth(field.value)]}
                  >
                    <SelectTrigger className='w-[110px]'>
                      <SelectValue placeholder='Month' />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(year: string) => {
                      const newDate = setYear(field.value, parseInt(year));
                      field.onChange(newDate);
                    }}
                    value={getYear(field.value).toString()}
                  >
                    <SelectTrigger className='w-[110px]'>
                      <SelectValue placeholder='Year' />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={(newDate: Date | undefined) => {
                    if (newDate) {
                      field.onChange(newDate);
                    }
                  }}
                  initialFocus
                  month={field.value}
                  onMonthChange={field.onChange}
                  locale={srLatn}
                />
                {useTimePicker && (
                  <div className='p-3 border-t border-border flex items-center justify-center'>
                    <TimePicker
                      date={field.value}
                      setDate={(newDate: Date | undefined) => {
                        if (newDate) {
                          field.onChange(newDate);
                        }
                      }}
                    />
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export { DateFormInput };
