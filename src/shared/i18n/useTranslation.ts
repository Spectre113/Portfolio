import { translations, type TranslationKey } from './translations.ts';
import { useLanguage } from '../language/useLanguage.ts';

export function useTranslation() {
  const { language } = useLanguage();

  return {
    language,
    t: (key: TranslationKey) => translations[language][key],
  };
}
