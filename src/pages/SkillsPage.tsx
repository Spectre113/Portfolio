import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Loader2,
  ShieldCheck,
  Sparkles,
  Server,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import './SkillsPage.css';

const runtimeEvents = [
  {
    icon: ArrowRight,
    command: 'user.click(search)',
    result: 'event captured',
  },
  {
    icon: Code2,
    command: 'React.render()',
    result: 'component updated',
  },
  {
    icon: Database,
    command: 'setState(query)',
    result: 'state changed',
  },
  {
    icon: Server,
    command: 'GET /api/items',
    result: 'fetch data',
  },
  {
    icon: ShieldCheck,
    command: 'zod.parse(response)',
    result: 'response parsed',
  },
  {
    icon: Activity,
    command: 'resolveUIState()',
    result: 'success state ready',
  },
  {
    icon: CheckCircle2,
    command: 'commitResult()',
    result: 'stable user experience',
  },
];

export function SkillsPage() {
  return (
    <main className="skills-page">
      <section className="container skills-page__hero">
        <div className="skills-page__content">
          <p className="skills-page__eyebrow">
            <span aria-hidden="true" />
            Навыки
          </p>

          <h1 className="skills-page__title">
            Навыки <span>в работе</span>
          </h1>

          <p className="skills-page__lead">
            Для меня frontend начинается не с набора технологий, а с понятной
            системы: компонентная архитектура, типобезопасные данные, аккуратная
            работа с API и интерфейс, который предсказуемо ведет себя в разных
            состояниях.
          </p>

          <ul className="skills-page__highlights list-reset">
            <li>
              <GitBranch size={22} strokeWidth={2.1} aria-hidden="true" />
              Архитектура компонентов
            </li>
            <li>
              <Layers3 size={22} strokeWidth={2.1} aria-hidden="true" />
              Данные, API и server state
            </li>
            <li>
              <Sparkles size={22} strokeWidth={2.1} aria-hidden="true" />
              Стабильный UX без шума
            </li>
          </ul>
        </div>

        <SkillFlowAnimation />
      </section>
    </main>
  );
}

function SkillFlowAnimation() {
  return (
    <article className="runtime-console" aria-label="Frontend runtime console">
      <div className="runtime-console__grid" aria-hidden="true" />

      <section className="runtime-console__panel runtime-console__panel--log">
        <div className="runtime-console__bar">
          <span />
          <span />
          <span />
        </div>
        <h2>Runtime flow</h2>

        <ol className="runtime-console__events list-reset">
          {runtimeEvents.map(({ icon: Icon, command, result }, index) => (
            <li
              className="runtime-console__event"
              key={command}
              style={{ '--event-index': index } as CSSProperties}
            >
              <span className="runtime-console__event-icon" aria-hidden="true">
                <Icon size={17} strokeWidth={2.2} />
              </span>
              <span className="runtime-console__command">{command}</span>
              <span className="runtime-console__result">{result}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="runtime-console__panel runtime-console__panel--preview">
        <div className="runtime-console__preview-head">
          <span>UI preview</span>
          <span className="runtime-console__badge">typed</span>
        </div>

        <div className="runtime-console__search">
          <span />
          <span>frontend skills</span>
        </div>

        <div className="runtime-console__state-stack" aria-hidden="true">
          <div className="runtime-console__state runtime-console__state--loading">
            <Loader2 size={18} strokeWidth={2.1} />
            loading
          </div>
          <div className="runtime-console__state runtime-console__state--error">
            <AlertCircle size={18} strokeWidth={2.1} />
            error handled
          </div>
          <div className="runtime-console__state runtime-console__state--success">
            <CheckCircle2 size={18} strokeWidth={2.1} />
            success
          </div>
        </div>

        <div className="runtime-console__result-card">
          <span className="runtime-console__result-icon" aria-hidden="true">
            &lt;/&gt;
          </span>
          <div>
            <strong>Clean result</strong>
            <p>validated data, predictable state, stable UX</p>
          </div>
        </div>
      </section>
    </article>
  );
}
