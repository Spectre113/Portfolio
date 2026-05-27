import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContactModal = () => setIsContactModalOpen(true);

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink className="brand" to="/" aria-label="На главную">
            <span className="brand__mark">&lt;/&gt;</span>
            <span>Spectre</span>
          </NavLink>

          <nav className="site-nav" aria-label="Основная навигация">
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'site-nav__link site-nav__link--active'
                    : 'site-nav__link'
                }
                key={item.to}
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
              Связаться со мной
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet context={{ openContactModal } satisfies MainLayoutContext} />
      </main>

      <footer className="site-footer">
        <p className="site-footer__copyright">
          © 2025 Spectre. Все права защищены.
        </p>
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
