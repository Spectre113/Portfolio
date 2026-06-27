import { useEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, Send, Sparkles, X } from 'lucide-react';
import './AIAssistantLauncher.css';

type AssistantResponse = {
  title: string;
  summary: string;
  bullets: string[];
  projects: string[];
};

const quickPrompts = [
  {
    label: 'Подхожу ли я под вакансию?',
    value:
      'Нужен frontend-разработчик на React и TypeScript: REST API, формы, server state, адаптивная верстка и аккуратная архитектура.',
  },
  {
    label: 'Какие проекты показать HR?',
    value:
      'Подбери проекты для HR, чтобы показать React, TypeScript, работу с API, валидацию данных и UX-состояния.',
  },
  {
    label: 'Кратко о моем опыте',
    value:
      'Составь короткое описание моего опыта как frontend-разработчика для рекрутера.',
  },
];

const fallbackResponse: AssistantResponse = {
  title: 'Готов к быстрой оценке вакансии',
  summary:
    'Вставьте описание позиции или выберите быстрый сценарий. Ассистент сопоставит требования с моими навыками, проектами и честно отметит, где опыт уже подтвержден практикой.',
  bullets: [
    'React, TypeScript, React Router и компонентная архитектура',
    'REST API, TanStack Query, Zod и предсказуемые UI-состояния',
    'Адаптивная верстка, темы, формы и внимание к UX',
  ],
  projects: ['VK Marusya', 'Avito Task', 'Portfolio'],
};

const projectHints = {
  marusya:
    'VK Marusya — SPA с авторизацией, REST API, TanStack Query, Zod и защищенными сценариями.',
  avito:
    'Avito Task — личный кабинет продавца: формы, фильтры, редактирование и AI-рекомендации через API.',
  portfolio:
    'Portfolio — архитектура сайта, маршруты, темы, анимации, contact form и аккуратный data layer.',
  vkTest:
    'VK Test — список карточек с котиками, избранное на клиенте и infinite scroll.',
};

function buildAssistantResponse(input: string): AssistantResponse {
  const normalizedInput = input.toLowerCase();
  const has = (keywords: string[]) =>
    keywords.some((keyword) => normalizedInput.includes(keyword));

  const matches = [
    has(['react', 'реакт']),
    has(['typescript', 'type script', 'ts', 'типизация']),
    has(['api', 'rest', 'данн', 'запрос']),
    has(['form', 'форм']),
    has(['zod', 'валидац']),
    has(['query', 'server state', 'состояни']),
    has(['адаптив', 'responsive', 'верст']),
    has(['ux', 'ui', 'интерфейс']),
    has(['ai', 'ии', 'ollama']),
    has(['test', 'тест']),
  ].filter(Boolean).length;

  const projects = [
    projectHints.marusya,
    projectHints.portfolio,
    has(['form', 'форм', 'ai', 'ии', 'ollama', 'личный кабинет'])
      ? projectHints.avito
      : projectHints.vkTest,
  ];

  if (matches >= 5) {
    return {
      title: 'Совпадение сильное',
      summary:
        'По описанию вакансия хорошо ложится на мой текущий профиль: React/TypeScript, работа с API, server state, валидация данных и интерфейсные сценарии уже подтверждены проектами.',
      bullets: [
        'Могу показать не только верстку, но и связку UI, API, Zod, TanStack Query и обработку loading/error-состояний.',
        'В проектах есть авторизация, защищенные маршруты, формы, фильтрация, debounce и адаптивная верстка.',
        'Честная зона роста: продолжаю усиливать тестирование, accessibility и производительность на более сложных сценариях.',
      ],
      projects,
    };
  }

  if (matches >= 2) {
    return {
      title: 'Совпадение умеренное, но релевантное',
      summary:
        'Часть требований уже закрыта практикой, особенно если позиция связана с React, TypeScript, REST API, формами или поддерживаемой компонентной архитектурой.',
      bullets: [
        'Лучше приложить проекты, где видно реальную работу с данными, состояниями и пользовательскими сценариями.',
        'Если в вакансии много production-процессов, стоит отдельно подчеркнуть готовность учиться у команды и быстро закрывать пробелы.',
        'Для HR полезно показать портфолио и GitHub, а в сопроводительном письме коротко связать требования с конкретными проектами.',
      ],
      projects,
    };
  }

  return {
    title: 'Нужно больше контекста',
    summary:
      'Описание пока слишком общее. Лучше вставить стек, обязанности и требования из вакансии, тогда ассистент точнее подберет аргументы и проекты.',
    bullets: [
      'Для frontend-позиций на React/TypeScript базовое совпадение уже есть.',
      'Если нужны формы, API, валидация или server state, стоит показать Marusya, Avito Task и Portfolio.',
      'Если вакансия больше про backend или mobile, лучше честно отметить, что мой фокус — frontend.',
    ],
    projects: [
      projectHints.marusya,
      projectHints.avito,
      projectHints.portfolio,
    ],
  };
}

export function AIAssistantLauncher({
  isOpen,
  onClose,
  onToggle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<AssistantResponse>(fallbackResponse);
  const [isThinking, setIsThinking] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const thinkingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (thinkingTimeoutRef.current !== null) {
        window.clearTimeout(thinkingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const trigger = triggerRef.current;

      if (!trigger) {
        return;
      }

      const rect = trigger.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY) || 1;
      const maxOffset = 3;

      trigger.style.setProperty(
        '--ai-eye-x',
        `${(deltaX / distance) * maxOffset}px`,
      );
      trigger.style.setProperty(
        '--ai-eye-y',
        `${(deltaY / distance) * maxOffset}px`,
      );
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setResponse(buildAssistantResponse(prompt));
  };

  const handleSubmit = () => {
    if (isThinking) {
      return;
    }

    setIsThinking(true);

    if (thinkingTimeoutRef.current !== null) {
      window.clearTimeout(thinkingTimeoutRef.current);
    }

    thinkingTimeoutRef.current = window.setTimeout(() => {
      setResponse(buildAssistantResponse(input));
      setIsThinking(false);
    }, 520);
  };

  return (
    <div className="ai-assistant">
      <button
        ref={triggerRef}
        className="ai-assistant__trigger btn-reset"
        type="button"
        aria-expanded={isOpen}
        aria-controls="ai-assistant-panel"
        aria-label={isOpen ? 'Закрыть AI-помощника' : 'Открыть AI-помощника'}
        onClick={onToggle}
      >
        <span className="ai-assistant__face" aria-hidden="true">
          <span className="ai-assistant__eye ai-assistant__eye--left" />
          <span className="ai-assistant__eye ai-assistant__eye--right" />
        </span>
      </button>

      {isOpen && (
        <>
          <button
            className="ai-assistant__backdrop btn-reset"
            type="button"
            aria-label="Закрыть AI-помощника"
            onClick={onClose}
          />

          <section
            className="ai-assistant__panel ai-assistant__panel--open"
            id="ai-assistant-panel"
            aria-label="AI-помощник по портфолио"
          >
            <div className="ai-assistant__header">
              <span className="ai-assistant__icon" aria-hidden="true">
                <Bot size={22} strokeWidth={2.1} />
              </span>
              <div>
                <h2>AI-помощник</h2>
                <p>Быстрая проверка вакансии по моим навыкам и проектам</p>
              </div>
              <button
                className="ai-assistant__close btn-reset"
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
              >
                <X size={20} strokeWidth={2.1} aria-hidden="true" />
              </button>
            </div>

            <div className="ai-assistant__notice">
              <Sparkles size={18} strokeWidth={2.1} aria-hidden="true" />
              <p>
                Сейчас это локальный демо-ассистент без внешнего API. Он не
                выдумывает опыт, а сопоставляет текст вакансии с тем, что уже
                есть в портфолио.
              </p>
            </div>

            <label className="ai-assistant__field">
              <span>Вопрос или описание вакансии</span>
              <textarea
                value={input}
                placeholder="Например: нужен React/TypeScript frontend junior с REST API, формами, валидацией и базовым пониманием архитектуры."
                rows={5}
                onChange={(event) => setInput(event.target.value)}
              />
            </label>

            <div className="ai-assistant__prompts">
              {quickPrompts.map((prompt) => (
                <button
                  className="btn-reset"
                  type="button"
                  key={prompt.label}
                  onClick={() => handlePromptClick(prompt.value)}
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            <button
              className="ai-assistant__submit btn-reset"
              type="button"
              disabled={isThinking}
              onClick={handleSubmit}
            >
              <Send size={18} strokeWidth={2.1} aria-hidden="true" />
              {isThinking ? 'Сверяю с портфолио...' : 'Оценить совпадение'}
            </button>

            <div
              className={`ai-assistant__result${isThinking ? ' ai-assistant__result--thinking' : ''}`}
              aria-live="polite"
            >
              <div className="ai-assistant__result-head">
                <CheckCircle2 size={18} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  {isThinking ? 'Анализирую требования' : response.title}
                </span>
              </div>
              <p>
                {isThinking
                  ? 'Смотрю, какие навыки и проекты лучше подсветить для этого запроса.'
                  : response.summary}
              </p>
              {!isThinking && (
                <>
                  <ul className="list-reset">
                    {response.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="ai-assistant__projects">
                    <span>Лучше показать:</span>
                    {response.projects.map((project) => (
                      <p key={project}>{project}</p>
                    ))}
                  </div>
                </>
              )}
            </div>

            <p className="ai-assistant__status">
              Следующий этап — заменить локальную логику на serverless endpoint,
              чтобы безопасно подключить реальную модель без ключей на клиенте.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
