import { ArrowRight, Download, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { HeroCodeCard } from './HeroCodeCard.tsx';
import './HeroSection.css';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Spectre113',
    icon: GitHubIcon,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/Spectre113',
    icon: Send,
  },
  {
    label: 'Email',
    href: 'mailto:VTvolody626@gmail.com',
    icon: Mail,
  },
];

const resumeUrl = `${import.meta.env.BASE_URL}resume-vladimir-toporkov.pdf`;

type HeroSectionProps = {
  onAssistantOpen: () => void;
  onContactClick: () => void;
};

export function HeroSection({
  onAssistantOpen,
  onContactClick,
}: HeroSectionProps) {
  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <div className="hero-section__content">
          <p className="hero-section__eyebrow">
            <span className="hero-section__status" aria-hidden="true" />
            Frontend Developer
          </p>

          <h1 className="hero-section__title">
            Привет, я <span>Владимир Топорков</span>
          </h1>

          <p className="hero-section__text">
            Frontend-разработчик на React и TypeScript. Разрабатываю SPA с
            авторизацией, REST API и управлением server state, уделяя внимание
            поддерживаемости, производительности и предсказуемому UX.
          </p>

          <div className="hero-section__actions">
            <Link className="hero-section__primary" to="/projects">
              Посмотрите мои проекты
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <button
              className="hero-section__secondary btn-reset"
              type="button"
              onClick={() => {
                trackPortfolioEvent('contact_modal_open', { source: 'hero' });
                onContactClick();
              }}
            >
              Связаться со мной
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <a
              className="hero-section__resume"
              href={resumeUrl}
              download="Vladimir-Toporkov-Frontend-Developer.pdf"
              onClick={() =>
                trackPortfolioEvent('resume_download', { source: 'hero' })
              }
            >
              Скачать резюме
              <Download size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>

          <ul
            className="hero-section__socials list-reset"
            aria-label="Социальные ссылки"
          >
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a
                  className="hero-section__social-link"
                  href={href}
                  aria-label={label}
                >
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-section__visual">
          <HeroCodeCard
            onAssistantOpen={onAssistantOpen}
            onContactClick={onContactClick}
            resumeUrl={resumeUrl}
          />
          <div className="dotted-grid hero-section__dots" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
