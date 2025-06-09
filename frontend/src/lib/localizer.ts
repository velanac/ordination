import { enUS, srLatn } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';

const locales = {
  en: enUS, // Add other languages as needed
  sr: srLatn,
};

// Initialize the localizer
export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
