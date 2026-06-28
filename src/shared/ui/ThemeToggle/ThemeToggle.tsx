import { useTranslation } from '../../i18n/useTranslation.ts';
import { useTheme } from '../../theme/useTheme.ts';
import './ThemeToggle.css';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle btn-reset"
      type="button"
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      title={isDark ? t('theme.titleLight') : t('theme.titleDark')}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? '☾' : '☼'}
      </span>
    </button>
  );
}
