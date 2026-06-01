import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ContactModal } from '../contact-modal/ContactModal.tsx';
import { ThemeToggle } from '../../shared/ui/ThemeToggle/ThemeToggle.tsx';
import './MainLayout.css';

const navigation = [
  { label: 'Главная', to: '/' },
  { label: 'Проекты', to: '/projects' },
  { label: 'Обо мне', to: '/about' },
  { label: 'Навыки', to: '/skills' },
];

export type MainLayoutContext = {
  openContactModal: () => void;
};

export function MainLayout() {
  const location = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink className="brand" to="/" aria-label="На главную">
            <span className="brand__mark">&lt;/&gt;</span>
            <span>Spectre</span>
          </NavLink>

          <button
            className="site-header__burger btn-reset"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-navigation"
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`site-nav${isMobileMenuOpen ? ' site-nav--open' : ''}`}
            id="site-navigation"
            aria-label="Основная навигация"
          >
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'site-nav__link site-nav__link--active'
                    : 'site-nav__link'
                }
                key={item.to}
                onClick={closeMobileMenu}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <ThemeToggle />
            <button
              className="site-header__contact btn-reset"
              type="button"
              onClick={openContactModal}
            >
              <span className="site-header__contact-text">
                Связаться со мной
              </span>
              <span className="site-header__contact-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <main className="page-transition" key={location.pathname}>
        <Outlet context={{ openContactModal } satisfies MainLayoutContext} />
      </main>

      <footer className="site-footer">
        <p className="site-footer__copyright">
          © 2026 Spectre. Все права защищены.
        </p>
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
