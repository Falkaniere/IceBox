import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import commonEN from './locales/en/common.json';
import fridgeEN from './locales/en/fridge.json';
import authEN from './locales/en/auth.json';
import notificationEN from './locales/pt/notification.json';

import commonPT from './locales/pt/common.json';
import fridgePT from './locales/pt/fridge.json';
import authPT from './locales/pt/auth.json';
import notificationPT from './locales/pt/notification.json';

const resources = {
  en: {
    common: commonEN,
    fridge: fridgeEN,
    auth: authEN,
    notification: notificationEN,
  },
  pt: {
    common: commonPT,
    fridge: fridgePT,
    auth: authPT,
    notification: notificationPT,
  },
};

function getDeviceLanguage() {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageCode ?? 'en';
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: 'en',

  ns: ['common', 'fridge', 'auth', 'notification'],
  defaultNS: 'common',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
