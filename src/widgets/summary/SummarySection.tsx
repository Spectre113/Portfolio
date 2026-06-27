import { ArrowRight, BarChart3, Quote, UserRound } from 'lucide-react';
import './SummarySection.css';

type SummarySectionProps = {
  onContactClick: () => void;
};

const stats = [
  { label: 'Год опыта', value: '1+' },
  { label: 'Проектов в портфолио', value: '6+' },
  {
    label: 'Фокус на качестве, деталях и стабильном результате',
    value: '100%',
    isWide: true,
  },
];

export function SummarySection({ onContactClick }: SummarySectionProps) {
  return (
    <section className="container summary-section">
      <article className="summary-card summary-card--about">
        <div className="summary-card__heading">
          <span className="summary-card__icon" aria-hidden="true">
            <UserRound size={22} strokeWidth={2.1} />
          </span>
          <h2 className="summary-card__title">Обо мне</h2>
        </div>

        <p className="summary-card__text">
          Разрабатываю SPA с авторизацией, REST API и управлением server state.
          Работаю с React Query, Zod и компонентной архитектурой, уделяя
          внимание поддерживаемости и производительности.
        </p>

        <a className="summary-card__link" href="/about">
          Подробнее обо мне
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </a>

        <div className="summary-card__plant" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      </article>

      <article className="summary-card summary-card--stats">
        <div className="summary-card__heading">
          <span className="summary-card__icon" aria-hidden="true">
            <BarChart3 size={22} strokeWidth={2.1} />
          </span>
          <h2 className="summary-card__title">В цифрах</h2>
        </div>

        <dl className="summary-card__stats">
          {stats.map((stat) => (
            <div
              className={`summary-card__stat${stat.isWide ? ' summary-card__stat--wide' : ''}`}
              key={stat.label}
            >
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </article>

      <article className="summary-card summary-card--cta">
        <Quote
          className="summary-card__quote"
          size={36}
          strokeWidth={3}
          aria-hidden="true"
        />
        <h2 className="summary-card__cta-title">
          Открыт к новым возможностям и интересным проектам
        </h2>
        <button
          className="summary-card__button"
          type="button"
          onClick={onContactClick}
        >
          Связаться со мной
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </article>
    </section>
  );
}
