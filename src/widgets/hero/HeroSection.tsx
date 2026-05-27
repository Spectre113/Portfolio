import {
  ArrowRight,
  Code2,
  Download,
  Send,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { HeroCodeCard } from './HeroCodeCard.tsx';
import './HeroSection.css';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Spectre113',
    icon: Code2,
  },
  {
    label: 'Telegram',
    href: 'https://t.me/Spectre113',
    icon: Send,
  },
];

const gridColumns = [15, 12, 9, 7, 6, 5, 4, 3];

const gridDots = gridColumns.map((rows, columnIndex) => {
  const horizontalFade = columnIndex < 4 ? 1 : 1 - (columnIndex - 3) * 0.11;

  return Array.from({ length: rows }, (_, rowIndex) => {
    const center = (rows - 1) / 2;
    const distanceFromCenter = Math.abs(rowIndex - center);
    const verticalFade = 1 - (distanceFromCenter / Math.max(center, 1)) * 0.58;
    const opacity = Math.max(0.26, verticalFade * horizontalFade);

    return {
      key: `${columnIndex}-${rowIndex}`,
      opacity: Number(opacity.toFixed(2)),
    };
  });
});

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
          <div className="hero-section__grid" aria-hidden="true">
            {gridDots.map((column, columnIndex) => (
              <span className="hero-section__grid-column" key={columnIndex}>
                {column.map((dot) => (
                  <span
                    className="hero-section__grid-dot"
                    key={dot.key}
                    style={{ opacity: dot.opacity }}
                  />
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
