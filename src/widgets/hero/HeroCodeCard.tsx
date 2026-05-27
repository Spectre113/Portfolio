import './HeroCodeCard.css';

const developerLines = [
  [
    { text: 'const', tone: 'keyword' },
    { text: ' developer ' },
    { text: '= ', tone: 'operator' },
    { text: '{' },
  ],
  [
    { text: '  name', tone: 'property' },
    { text: ': ' },
    { text: "'Spectre113'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  realName', tone: 'property' },
    { text: ': ' },
    { text: "'Vladimir Toporkov'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  role', tone: 'property' },
    { text: ': ' },
    { text: "'Frontend Developer'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  focus', tone: 'property' },
    { text: ': ' },
    { text: "['React', 'TypeScript', 'UI/UX']", tone: 'string' },
    { text: ',' },
  ],
  [{ text: '};' }],
  [],
  [
    { text: 'function', tone: 'keyword' },
    { text: ' createExperience' },
    { text: '() ', tone: 'operator' },
    { text: '{' },
  ],
  [
    { text: '  return', tone: 'keyword' },
    { text: ' ' },
    { text: "'clean code + great design'", tone: 'string' },
    { text: ';' },
  ],
  [{ text: '}' }],
];

export function HeroCodeCard() {
  return (
    <div className="hero-code" aria-label="Пример кода о разработчике">
      <div className="hero-code__toolbar" aria-hidden="true">
        <span className="hero-code__dot hero-code__dot--red" />
        <span className="hero-code__dot hero-code__dot--yellow" />
        <span className="hero-code__dot hero-code__dot--green" />
      </div>

      <pre className="hero-code__pre">
        <code>
          {developerLines.map((line, index) => (
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
            </span>
          ))}
          <span className="hero-code__cursor" aria-hidden="true" />
        </code>
      </pre>
    </div>
  );
}
