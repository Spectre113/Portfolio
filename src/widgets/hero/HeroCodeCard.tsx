import './HeroCodeCard.css';
import { useTypewriterSequence } from './useTypewriterSequence.ts';

export function HeroCodeCard() {
  const { cursorLineIndex, isAnimating, lines } = useTypewriterSequence();

  return (
    <div className="hero-code" aria-label="Пример кода о разработчике">
      <div className="hero-code__toolbar" aria-hidden="true">
        <span className="hero-code__dot hero-code__dot--red" />
        <span className="hero-code__dot hero-code__dot--yellow" />
        <span className="hero-code__dot hero-code__dot--green" />
      </div>

      <pre className="hero-code__pre">
        <code>
          {lines.map((line, index) => (
            <span className="hero-code__line" key={index}>
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
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
