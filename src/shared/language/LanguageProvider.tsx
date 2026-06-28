import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { LanguageContext, type Language } from './language-context.ts';

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

function isLanguage(value: string | null): value is Language {
  return value === 'ru' || value === 'en';
}

function getPreferredLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'ru';
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (isLanguage(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguages = window.navigator.languages.length > 0
    ? window.navigator.languages
    : [window.navigator.language];

  return browserLanguages.some((language) =>
    language.toLowerCase().startsWith('ru'),
  )
    ? 'ru'
    : 'en';
}

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(getPreferredLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => {
        setLanguage((currentLanguage) =>
          currentLanguage === 'ru' ? 'en' : 'ru',
        );
      },
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
