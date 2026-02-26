import { useTranslation } from 'react-i18next';

type Namespaces = 'common' | 'fridge' | 'auth';

export function useAppTranslation(ns?: Namespaces) {
  const { t, i18n, ...rest } = useTranslation(ns ? [ns, 'common'] : 'common');

  return {
    t,
    changeLanguage: (lang: 'pt' | 'en') => i18n.changeLanguage(lang),
    currentLanguage: i18n.language,
    ...rest,
  };
}
