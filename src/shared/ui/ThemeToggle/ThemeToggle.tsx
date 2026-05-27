import { useTheme } from '../../theme/useTheme.ts';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      className="theme-toggle btn-reset"
      type="button"
      aria-label={isDark ? 'Включить светлую тему' : 'Включить темную тему'}
      title={isDark ? 'Светлая тема' : 'Темная тема'}
      onClick={toggleTheme}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isDark ? '☾' : '☼'}
      </span>
    </button>
  );
}
