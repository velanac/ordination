import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importujte JSON fajlove direktno (opciono)
// import enCommon from '/public/locales/en/common.json';
// import srCommon from '/public/locales/sr/common.json';
// import enAuth from '/public/locales/en/auth.json';
// import srAuth from '/public/locales/sr/auth.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    preload: ['en', 'sr'],
    ns: ['common', 'auth', 'dashboard', 'events', 'validation'],
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      allowMultiLoading: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
