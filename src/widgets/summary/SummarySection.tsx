import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import './SummarySection.css';

type SummarySectionProps = {
  onContactClick: () => void;
};

const highlights = [
  '6 проектов: учебные, тестовые и pet',
  'React, TypeScript, SPA и компонентная архитектура',
  'REST API, формы, Zod и server state',
  'AI-помощник, аналитика событий и адаптивный интерфейс',
];

export function SummarySection({ onContactClick }: SummarySectionProps) {
  return (
    <section className="container summary-section">
      <article className="summary-card summary-card--search">
        <div className="summary-card__heading">
          <span className="summary-card__icon" aria-hidden="true">
            <BriefcaseBusiness size={22} strokeWidth={2.1} />
          </span>
          <h2 className="summary-card__title">Что ищу сейчас</h2>
        </div>

        <p className="summary-card__text">
          Ищу frontend-стажировку или junior-позицию, где нужны React,
          TypeScript, работа с API, аккуратный UI и готовность быстро расти в
          команде.
        </p>

        <Link className="summary-card__link" to="/projects">
          Посмотрите мои проекты
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </Link>

        <div className="summary-card__plant" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </article>

      <article className="summary-card summary-card--highlights">
        <div className="summary-card__heading">
          <span className="summary-card__icon" aria-hidden="true">
            <CheckCircle2 size={22} strokeWidth={2.1} />
          </span>
          <h2 className="summary-card__title">Коротко по делу</h2>
        </div>

        <ul className="summary-card__list list-reset">
          {highlights.map((highlight) => (
            <li key={highlight}>
              <CheckCircle2 size={17} strokeWidth={2.2} aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="summary-card summary-card--cta">
        <Sparkles
          className="summary-card__quote"
          size={36}
          strokeWidth={3}
          aria-hidden="true"
        />
        <h2 className="summary-card__cta-title">
          Есть подходящая позиция или проект?
        </h2>
        <p className="summary-card__text">
          Напишите мне - обсудим задачу, вакансию или формат стажировки.
        </p>
        <button
          className="summary-card__button"
          type="button"
          onClick={() => {
            trackPortfolioEvent('contact_modal_open', { source: 'summary' });
            onContactClick();
          }}
        >
          Связаться со мной
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </article>
    </section>
  );
}
