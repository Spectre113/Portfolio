import './HeroCodeCard.css';
import { useTypewriterSequence } from './useTypewriterSequence.ts';
import type { CodeToken } from './useTypewriterSequence.ts';

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

export function HeroCodeCard() {
  const { cursorLineIndex, isAnimating, lines } = useTypewriterSequence();

  return (
    <div
      className="hero-code"
      aria-label="Пример кода с безопасным браузерным контекстом посетителя"
    >
      <div className="hero-code__toolbar" aria-hidden="true">
        <span className="hero-code__dot hero-code__dot--red" />
        <span className="hero-code__dot hero-code__dot--yellow" />
        <span className="hero-code__dot hero-code__dot--green" />
      </div>

      <pre className="hero-code__pre">
        <code>
          {lines.map((line, index) => {
            const lineContent = renderLineContent({
              cursorLineIndex,
              index,
              isAnimating,
              line,
            });

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
