import { ArrowRight, Download, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  GitHubIcon,
  LinkedInIcon,
} from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import { HeroCodeCard } from './HeroCodeCard.tsx';
import './HeroSection.css';

const socialLinks = [
  {
    label: 'GitHub profile',
    href: 'https://github.com/Spectre113',
    icon: GitHubIcon,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/Spectre113',
    icon: Send,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/vladimir-toporkov-0554763a9/',
    icon: LinkedInIcon,
  },
  {
    label: 'Email',
    href: 'mailto:VTvolody626@gmail.com',
    icon: Mail,
  },
];

const resumeFiles = {
  en: {
    downloadName: 'Vladimir-Toporkov-Frontend-Developer-CV.pdf',
    fileName: 'resume-vladimir-toporkov-en.pdf',
  },
  ru: {
    downloadName: 'Vladimir-Toporkov-Frontend-Developer.pdf',
    fileName: 'resume-vladimir-toporkov.pdf',
  },
} as const;

type HeroSectionProps = {
  onContactClick: () => void;
};

export function HeroSection({ onContactClick }: HeroSectionProps) {
  const { language, t } = useTranslation();
  const resumeFile = resumeFiles[language];
  const resumeUrl = `${import.meta.env.BASE_URL}${resumeFile.fileName}`;

  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <div className="hero-section__content">
          <p className="hero-section__eyebrow">
            <span className="hero-section__status" aria-hidden="true" />
            {t('hero.eyebrow')}
          </p>

          <h1 className="hero-section__title">
            {t('hero.title')} <span>{t('hero.titleName')}</span>
          </h1>

          <p className="hero-section__text">{t('hero.description')}</p>

          <div className="hero-section__actions">
            <Link className="hero-section__primary" to="/projects">
              {t('hero.projects')}
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
              {t('hero.contact')}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
            <a
              className="hero-section__resume"
              href={resumeUrl}
              download={resumeFile.downloadName}
              onClick={() =>
                trackPortfolioEvent('resume_download', { source: 'hero' })
              }
            >
              {t('hero.resume')}
              <Download size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>

          <ul
            className="hero-section__socials list-reset"
            aria-label={t('hero.ariaSocials')}
          >
            {socialLinks.map(({ href, icon: Icon, label }) => {
              const isExternalLink = href.startsWith('http');

              return (
                <li key={label}>
                  <a
                    className="hero-section__social-link"
                    href={href}
                    aria-label={label}
                    rel={isExternalLink ? 'noreferrer' : undefined}
                    target={isExternalLink ? '_blank' : undefined}
                  >
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hero-section__visual">
          <HeroCodeCard />
          <div className="dotted-grid hero-section__dots" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
