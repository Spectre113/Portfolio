import {
  ArrowRight,
  Download,
  Mail,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
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

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-section__inner">
        <div className="hero-section__content">
          <p className="hero-section__eyebrow">
            <span className="hero-section__status" aria-hidden="true" />
            Frontend Developer
          </p>

          <h1 className="hero-section__title">
            Привет, я <span>Владимир</span>
          </h1>

          <p className="hero-section__text">
            Создаю современные веб-приложения с чистым кодом, вниманием к
            деталям и любовью к интерфейсам, которыми приятно пользоваться.
          </p>

          <div className="hero-section__actions">
            <Link className="hero-section__primary" to="/projects">
              Смотреть проекты
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a className="hero-section__secondary" href="/resume.pdf" download>
              Скачать резюме
              <Download size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>

          <ul className="hero-section__socials list-reset" aria-label="Социальные ссылки">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <li key={label}>
                <a className="hero-section__social-link" href={href} aria-label={label}>
                  <Icon size={22} strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
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
