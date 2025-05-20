import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ILocale {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

const locales: ILocale[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '/assets/flags/gb.svg',
  },
  {
    code: 'sr',
    name: 'Serbian',
    nativeName: 'Cрпски језик',
    flag: '/assets/flags/rs.svg',
  },
];

function SelectLocale() {
  const { i18n } = useTranslation();

  const selectedLocale =
    locales.find((e) => e.code === i18n.language) ?? locales[0];
  return (
    <Select
      onValueChange={(val) => i18n.changeLanguage(val)}
      defaultValue={selectedLocale.code}
    >
      <SelectTrigger>
        <SelectValue placeholder='Select language' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem key={locale.code} value={locale.code}>
              <div className='flex justify-center items-center'>
                <div>
                  <img
                    src={locale.flag}
                    alt={`${locale.name} flag`}
                    width='20px'
                    className='mr-2'
                  />
                </div>
                <div>{locale.name}</div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export { SelectLocale };
