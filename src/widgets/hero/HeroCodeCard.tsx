import { Link } from 'react-router-dom';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import './HeroCodeCard.css';
import { useTypewriterSequence } from './useTypewriterSequence.ts';
import type { CodeToken } from './useTypewriterSequence.ts';

type HeroCodeCardProps = {
  analyticsSource?: string;
  onAssistantOpen: () => void;
  onContactClick: () => void;
  resumeUrl: string;
};

const lineActions = {
  projectSectionVisits: 1,
  resumeDownloads: 2,
  contactIntent: 3,
  assistantOpens: 4,
} as const;

function getLineText(line: CodeToken[]) {
  return line.map((part) => part.text).join('');
}

function renderLineContent({
  cursorLineIndex,
  index,
  isAnimating,
  line,
}: {
  cursorLineIndex: number;
  index: number;
  isAnimating: boolean;
  line: CodeToken[];
}) {
  return (
    <>
      {line.map((part, partIndex) => (
        <span
          className={
            part.tone ? `hero-code__token hero-code__token--${part.tone}` : undefined
          }
          key={`${part.text}-${partIndex}`}
        >
          {part.text}
        </span>
      ))}
      {index === cursorLineIndex && (
        <span
          className={
            isAnimating
              ? 'hero-code__cursor hero-code__cursor--animated'
              : 'hero-code__cursor'
          }
          aria-hidden="true"
        />
      )}
    </>
  );
}

export function HeroCodeCard({
  analyticsSource = 'hero_code',
  onAssistantOpen,
  onContactClick,
  resumeUrl,
}: HeroCodeCardProps) {
  const { cursorLineIndex, isAnimating, lines } = useTypewriterSequence();

  return (
    <div
      className="hero-code"
      aria-label="Пример кода о мониторинге пользовательского поведения"
    >
      <div className="hero-code__toolbar" aria-hidden="true">
        <span className="hero-code__dot hero-code__dot--red" />
        <span className="hero-code__dot hero-code__dot--yellow" />
        <span className="hero-code__dot hero-code__dot--green" />
      </div>

      <pre className="hero-code__pre">
        <code>
          {lines.map((line, index) => {
            const lineText = getLineText(line);
            const hasVisibleCode = lineText.trim().length > 0;
            const lineContent = renderLineContent({
              cursorLineIndex,
              index,
              isAnimating,
              line,
            });

            if (index === lineActions.projectSectionVisits && hasVisibleCode) {
              return (
                <Link
                  aria-label="Открыть проекты"
                  className="hero-code__line hero-code__line--action"
                  key={index}
                  onClick={() =>
                    trackPortfolioEvent('projects_page_open', {
                      source: analyticsSource,
                    })
                  }
                  to="/projects"
                >
                  {lineContent}
                </Link>
              );
            }

            if (index === lineActions.resumeDownloads && hasVisibleCode) {
              return (
                <a
                  aria-label="Скачать резюме"
                  className="hero-code__line hero-code__line--action"
                  download="Vladimir-Toporkov-Frontend-Developer.pdf"
                  href={resumeUrl}
                  key={index}
                  onClick={() =>
                    trackPortfolioEvent('resume_download', {
                      source: analyticsSource,
                    })
                  }
                >
                  {lineContent}
                </a>
              );
            }

            if (index === lineActions.contactIntent && hasVisibleCode) {
              return (
                <button
                  aria-label="Открыть контакты"
                  className="hero-code__line hero-code__line--action btn-reset"
                  key={index}
                  type="button"
                  onClick={() => {
                    trackPortfolioEvent('contact_modal_open', {
                      source: analyticsSource,
                    });
                    onContactClick();
                  }}
                >
                  {lineContent}
                </button>
              );
            }

            if (index === lineActions.assistantOpens && hasVisibleCode) {
              return (
                <button
                  aria-label="Открыть AI-помощника"
                  className="hero-code__line hero-code__line--action btn-reset"
                  key={index}
                  type="button"
                  onClick={onAssistantOpen}
                >
                  {lineContent}
                </button>
              );
            }

            return (
              <span className="hero-code__line" key={index}>
                {lineContent}
              </span>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
