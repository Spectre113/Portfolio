import { Languages } from 'lucide-react';
import { useLanguage } from '../../language/useLanguage.ts';
import './LanguageToggle.css';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();
  const isRussian = language === 'ru';

  return (
    <button
      className="language-toggle btn-reset"
      type="button"
      aria-label={
        isRussian
          ? 'Switch portfolio language to English'
          : 'Переключить портфолио на русский язык'
      }
      title={isRussian ? 'English' : 'Русский'}
      onClick={toggleLanguage}
    >
      <Languages className="language-toggle__icon" aria-hidden="true" />
      <span
        className={
          isRussian
            ? 'language-toggle__option language-toggle__option--active'
            : 'language-toggle__option'
        }
      >
        RU
      </span>
      <span
        className={
          !isRussian
            ? 'language-toggle__option language-toggle__option--active'
            : 'language-toggle__option'
        }
      >
        EN
      </span>
    </button>
  );
}
