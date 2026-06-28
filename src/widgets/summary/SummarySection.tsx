import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import type { TranslationKey } from '../../shared/i18n/translations.ts';
import './SummarySection.css';

type SummarySectionProps = {
  onContactClick: () => void;
};

const highlights: TranslationKey[] = [
  'summary.highlight1',
  'summary.highlight2',
  'summary.highlight3',
  'summary.highlight4',
];

export function SummarySection({ onContactClick }: SummarySectionProps) {
  const { t } = useTranslation();

  return (
    <section className="container summary-section">
      <article className="summary-card summary-card--search">
        <div className="summary-card__heading">
          <span className="summary-card__icon" aria-hidden="true">
            <BriefcaseBusiness size={22} strokeWidth={2.1} />
          </span>
          <h2 className="summary-card__title">{t('summary.searchTitle')}</h2>
        </div>

        <p className="summary-card__text">{t('summary.searchText')}</p>

        <Link className="summary-card__link" to="/projects">
          {t('summary.projects')}
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
          <h2 className="summary-card__title">
            {t('summary.highlightsTitle')}
          </h2>
        </div>

        <ul className="summary-card__list list-reset">
          {highlights.map((highlight) => (
            <li key={highlight}>
              <CheckCircle2 size={17} strokeWidth={2.2} aria-hidden="true" />
              <span>{t(highlight)}</span>
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
          {t('summary.ctaTitle')}
        </h2>
        <p className="summary-card__text">{t('summary.ctaText')}</p>
        <button
          className="summary-card__button"
          type="button"
          onClick={() => {
            trackPortfolioEvent('contact_modal_open', { source: 'summary' });
            onContactClick();
          }}
        >
          {t('summary.ctaButton')}
          <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
        </button>
      </article>
    </section>
  );
}
