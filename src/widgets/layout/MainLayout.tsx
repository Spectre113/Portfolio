import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AIAssistantLauncher } from '../ai-assistant/AIAssistantLauncher.tsx';
import { ContactModal } from '../contact-modal/ContactModal.tsx';
import { LanguageToggle } from '../../shared/ui/LanguageToggle/LanguageToggle.tsx';
import { ThemeToggle } from '../../shared/ui/ThemeToggle/ThemeToggle.tsx';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import './MainLayout.css';

const navigation = [
  { labelKey: 'nav.home', to: '/' },
  { labelKey: 'nav.projects', to: '/projects' },
  { labelKey: 'nav.about', to: '/about' },
  { labelKey: 'nav.skills', to: '/skills' },
] as const;

export type MainLayoutContext = {
  openAIAssistant: (source?: string) => void;
  openContactModal: () => void;
};

export function MainLayout() {
  const location = useLocation();
  const { t } = useTranslation();
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openContactModal = () => {
    setIsAIAssistantOpen(false);
    setIsContactModalOpen(true);
  };
  const openAIAssistant = (source = 'hero_code') => {
    setIsContactModalOpen(false);
    setIsMobileMenuOpen(false);
    setIsAIAssistantOpen(true);
    trackPortfolioEvent('ai_assistant_open', { source });
  };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleAIAssistant = () => {
    setIsContactModalOpen(false);
    setIsMobileMenuOpen(false);
    setIsAIAssistantOpen((isOpen) => {
      if (!isOpen) {
        trackPortfolioEvent('ai_assistant_open', { source: 'header' });
      }

      return !isOpen;
    });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink className="brand" to="/" aria-label={t('header.homeAria')}>
            <span className="brand__mark">&lt;/&gt;</span>
          </NavLink>

          <button
            className="site-header__burger btn-reset"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="site-navigation"
            aria-label={
              isMobileMenuOpen ? t('common.closeMenu') : t('common.openMenu')
            }
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`site-nav${isMobileMenuOpen ? ' site-nav--open' : ''}`}
            id="site-navigation"
            aria-label={t('header.navAria')}
          >
            <div className="site-nav__utility" aria-label={t('common.settings')}>
              <LanguageToggle />
              <ThemeToggle />
            </div>

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
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            <div className="site-header__utility-actions">
              <LanguageToggle />
              <ThemeToggle />
            </div>
            <button
              className="site-header__contact btn-reset"
              type="button"
              onClick={() => {
                trackPortfolioEvent('contact_modal_open', { source: 'header' });
                openContactModal();
              }}
            >
              <span className="site-header__contact-text">
                {t('header.contact')}
              </span>
              <span className="site-header__contact-icon" aria-hidden="true" />
            </button>
            <AIAssistantLauncher
              className="site-header__assistant"
              isOpen={isAIAssistantOpen}
              onClose={() => setIsAIAssistantOpen(false)}
              onToggle={toggleAIAssistant}
            />
          </div>
        </div>
      </header>

      <main className="page-transition" key={location.pathname}>
        <Outlet
          context={
            { openAIAssistant, openContactModal } satisfies MainLayoutContext
          }
        />
      </main>

      <footer className="site-footer">
        <p className="site-footer__copyright">{t('footer.copyright')}</p>
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
