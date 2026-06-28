import { createContext } from 'react';

export type Language = 'ru' | 'en';

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextValue | null>(null);
