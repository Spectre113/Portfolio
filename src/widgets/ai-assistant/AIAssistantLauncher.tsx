import { useEffect, useRef, useState } from 'react';
import { Bot, CheckCircle2, Send, Sparkles, X } from 'lucide-react';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import type { Language } from '../../shared/language/language-context.ts';
import './AIAssistantLauncher.css';

type AssistantResponse = {
  title: string;
  summary: string;
  bullets: string[];
  projects: string[];
};

type AssistantSource = 'initial' | 'ai' | 'fallback';

type QuickPrompt = {
  label: string;
  value: string;
};

type AssistantCopy = {
  fallbackResponse: AssistantResponse;
  projectHints: {
    avito: string;
    marusya: string;
    portfolio: string;
    vkTest: string;
  };
  quickPrompts: QuickPrompt[];
  responses: {
    empty: AssistantResponse;
    moderate: Omit<AssistantResponse, 'projects'>;
    stack: AssistantResponse;
    strong: Omit<AssistantResponse, 'projects'>;
  };
};

const assistantCopyRu: AssistantCopy = {
  quickPrompts: [
    {
      label: 'Разобрать вакансию',
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
    {
      label: 'Стек проекта',
      value:
        'Расскажи, какой стек используется в проектах портфолио и где лучше видно React, TypeScript, API, Zod и server state.',
    },
  ],
  fallbackResponse: {
    title: 'Готов к быстрой оценке вакансии',
    summary:
      'Вставьте описание позиции или выберите быстрый сценарий. Ассистент сопоставит требования с моими навыками, проектами и честно отметит, где опыт уже подтвержден практикой.',
    bullets: [
      'React, TypeScript, React Router и компонентная архитектура',
      'REST API, TanStack Query, Zod и предсказуемые UI-состояния',
      'Адаптивная верстка, темы, формы и внимание к UX',
    ],
    projects: ['VK Marusya', 'Avito Task', 'Portfolio'],
  },
  projectHints: {
    marusya:
      'VK Marusya - SPA с авторизацией, REST API, TanStack Query, Zod и защищенными сценариями.',
    avito:
      'Avito Task - личный кабинет продавца: формы, фильтры, редактирование и AI-рекомендации через API.',
    portfolio:
      'Portfolio - архитектура сайта, маршруты, темы, анимации, contact form и аккуратный data layer.',
    vkTest:
      'VK Test - список карточек с котиками, избранное на клиенте и infinite scroll.',
  },
  responses: {
    strong: {
      title: 'Требования хорошо закрываются',
      summary:
        'По описанию вакансия хорошо ложится на мой текущий профиль: React/TypeScript, работа с API, server state, валидация данных и интерфейсные сценарии уже подтверждены проектами.',
      bullets: [
        'Могу показать не только верстку, но и связку UI, API, Zod, TanStack Query и обработку loading/error-состояний.',
        'В проектах есть авторизация, защищенные маршруты, формы, фильтрация, debounce и адаптивная верстка.',
        'Честная зона роста: продолжаю усиливать тестирование, accessibility и производительность на более сложных сценариях.',
      ],
    },
    moderate: {
      title: 'Часть требований уже закрыта',
      summary:
        'Часть требований уже закрыта практикой, особенно если позиция связана с React, TypeScript, REST API, формами или поддерживаемой компонентной архитектурой.',
      bullets: [
        'Лучше приложить проекты, где видно реальную работу с данными, состояниями и пользовательскими сценариями.',
        'Если в вакансии много production-процессов, стоит отдельно подчеркнуть готовность учиться у команды и быстро закрывать пробелы.',
        'Для HR полезно показать портфолио и GitHub, а в сопроводительном письме коротко связать требования с конкретными проектами.',
      ],
    },
    empty: {
      title: 'Нужно больше контекста',
      summary:
        'Описание пока слишком общее. Лучше вставить стек, обязанности и требования из вакансии, тогда ассистент точнее подберет аргументы и проекты.',
      bullets: [
        'Для frontend-позиций на React/TypeScript базовое совпадение уже есть.',
        'Если нужны формы, API, валидация или server state, стоит показать Marusya, Avito Task и Portfolio.',
        'Если вакансия больше про backend или mobile, лучше честно отметить, что мой фокус - frontend.',
      ],
      projects: [],
    },
    stack: {
      title: 'Стек хорошо виден в проектах',
      summary:
        'Основной стек портфолио - React, TypeScript, Vite, React Router, TanStack Query, Zod, React Hook Form, REST API, адаптивная верстка и аккуратная работа с UI-состояниями.',
      bullets: [
        'VK Marusya показывает React SPA, авторизацию, REST API, TanStack Query, Zod и protected flows.',
        'Avito Task хорошо раскрывает формы, React Hook Form, Zod, фильтры, пагинацию и AI-рекомендации через API.',
        'Portfolio показывает архитектуру приложения, роутинг, темы, анимации, аналитику событий и serverless AI endpoint.',
      ],
      projects: [
        'VK Marusya - основной пример React/TypeScript + API + server state.',
        'Avito Task - лучший пример форм, валидации и сложных UI-сценариев.',
        'Portfolio - пример архитектуры, темизации, аналитики и AI-интеграции.',
      ],
    },
  },
};

const assistantCopyEn: AssistantCopy = {
  quickPrompts: [
    {
      label: 'Do I match this role?',
      value:
        'Looking for a React and TypeScript frontend developer: REST API, forms, server state, responsive layout and clean architecture.',
    },
    {
      label: 'Which projects fit HR?',
      value:
        'Pick projects for HR that show React, TypeScript, API work, data validation and UX states.',
    },
    {
      label: 'Summarize my experience',
      value:
        'Write a short recruiter-friendly summary of my frontend developer experience.',
    },
    {
      label: 'Project stack',
      value:
        'Explain which stack is used in the portfolio projects and where React, TypeScript, API, Zod and server state are best demonstrated.',
    },
  ],
  fallbackResponse: {
    title: 'Ready for a quick role check',
    summary:
      'Paste a role description or choose a quick prompt. The assistant compares requirements with my skills and projects, and marks honestly where experience is already backed by practice.',
    bullets: [
      'React, TypeScript, React Router and component architecture',
      'REST API, TanStack Query, Zod and predictable UI states',
      'Responsive layout, themes, forms and UX attention',
    ],
    projects: ['VK Marusya', 'Avito Task', 'Portfolio'],
  },
  projectHints: {
    marusya:
      'VK Marusya - movie SPA with auth, REST API, TanStack Query, Zod and protected flows.',
    avito:
      'Avito Task - seller dashboard with forms, filters, editing and AI suggestions through API.',
    portfolio:
      'Portfolio - site architecture, routes, themes, animations, contact form and tidy data layer.',
    vkTest:
      'VK Test - card list with cats, client-side favorites and infinite scroll.',
  },
  responses: {
    strong: {
      title: 'Strong match',
      summary:
        'The role description matches my current profile well: React/TypeScript, API work, server state, data validation and UI scenarios are already backed by projects.',
      bullets: [
        'I can show not only layout, but the UI, API, Zod, TanStack Query and loading/error-state flow.',
        'The projects include auth, protected routes, forms, filtering, debounce and responsive layout.',
        'Honest growth area: I am still strengthening testing, accessibility and performance on more complex scenarios.',
      ],
    },
    moderate: {
      title: 'Moderate but relevant match',
      summary:
        'Part of the requirements is already covered by practice, especially if the role involves React, TypeScript, REST APIs, forms or maintainable component architecture.',
      bullets: [
        'It is better to attach projects that show real data work, state handling and user scenarios.',
        'If the role has many production processes, I would highlight my readiness to learn from the team and close gaps quickly.',
        'For HR, it is useful to show the portfolio and GitHub, then connect requirements with specific projects in a short cover note.',
      ],
    },
    empty: {
      title: 'More context needed',
      summary:
        'The description is too broad. Paste the stack, responsibilities and requirements, and the assistant will match arguments and projects more accurately.',
      bullets: [
        'For React/TypeScript frontend roles, the base match is already there.',
        'If forms, API, validation or server state are needed, Marusya, Avito Task and Portfolio are worth showing.',
        'If the role is mostly backend or mobile, it is better to note honestly that my focus is frontend.',
      ],
      projects: [],
    },
    stack: {
      title: 'The stack is visible across projects',
      summary:
        'The core portfolio stack is React, TypeScript, Vite, React Router, TanStack Query, Zod, React Hook Form, REST APIs, responsive layout and careful UI-state handling.',
      bullets: [
        'VK Marusya shows a React SPA with auth, REST API, TanStack Query, Zod and protected flows.',
        'Avito Task highlights forms, React Hook Form, Zod, filters, pagination and AI suggestions through API.',
        'Portfolio shows app architecture, routing, themes, animations, event analytics and a serverless AI endpoint.',
      ],
      projects: [
        'VK Marusya - main React/TypeScript + API + server state example.',
        'Avito Task - best form, validation and complex UI-state example.',
        'Portfolio - architecture, theming, analytics and AI integration example.',
      ],
    },
  },
};

const assistantCopyByLanguage = {
  ru: assistantCopyRu,
  en: assistantCopyEn,
} satisfies Record<Language, AssistantCopy>;

const uiCopy = {
  ru: {
    assistantAria: 'AI-помощник по портфолио',
    close: 'Закрыть',
    closeAssistant: 'Закрыть AI-помощника',
    fieldLabel: 'Вопрос или описание вакансии',
    inputPlaceholder:
      'Например: нужен React/TypeScript frontend junior с REST API, формами, валидацией и базовым пониманием архитектуры.',
    notice:
      'Ассистент сопоставляет текст вакансии с моими реальными навыками и проектами. Если модель временно недоступна, сайт использует локальный резервный сценарий.',
    openAssistant: 'Открыть AI-помощника',
    projectsTitle: 'Лучше показать:',
    resultAi: 'Ответ Groq AI',
    resultFallback: 'Локальный резервный ответ',
    resultInitial: 'Готов к проверке',
    status:
      'AI подключается через serverless endpoint, поэтому API-ключ не попадает в клиентский код.',
    submit: 'Спросить ассистента',
    subtitle: 'Быстрая проверка вакансии по моим навыкам и проектам',
    thinking: 'Сверяю с портфолио...',
    thinkingSummary:
      'Смотрю, какие навыки и проекты лучше подсветить для этого запроса.',
    thinkingTitle: 'Анализирую требования',
    title: 'AI-помощник',
  },
  en: {
    assistantAria: 'Portfolio AI assistant',
    close: 'Close',
    closeAssistant: 'Close AI assistant',
    fieldLabel: 'Question or vacancy description',
    inputPlaceholder:
      'Example: React/TypeScript frontend junior with REST API, forms, validation and basic architecture understanding.',
    notice:
      'The assistant compares a vacancy text with my real skills and projects. If the model is temporarily unavailable, the site uses a local fallback scenario.',
    openAssistant: 'Open AI assistant',
    projectsTitle: 'Best to show:',
    resultAi: 'Groq AI answer',
    resultFallback: 'Local fallback answer',
    resultInitial: 'Ready to check',
    status:
      'AI runs through a serverless endpoint, so the API key never reaches client code.',
    submit: 'Ask assistant',
    subtitle: 'Quick vacancy check against my skills and projects',
    thinking: 'Checking portfolio...',
    thinkingSummary:
      'Looking at which skills and projects are best to highlight for this request.',
    thinkingTitle: 'Analyzing requirements',
    title: 'AI assistant',
  },
};

async function requestAssistantResponse(
  input: string,
  language: Language,
): Promise<AssistantResponse> {
  const response = await fetch('/api/assistant', {
    body: JSON.stringify({ input, language }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Assistant request failed');
  }

  return response.json() as Promise<AssistantResponse>;
}

function buildAssistantResponse(
  input: string,
  copy: AssistantCopy,
): AssistantResponse {
  const normalizedInput = input.toLowerCase();
  const has = (keywords: string[]) =>
    keywords.some((keyword) => normalizedInput.includes(keyword));
  const isStackQuestion = has([
    'stack',
    'tech stack',
    'technology',
    'technologies',
    'tools',
    'стек',
    'технолог',
    'инструмент',
  ]);

  if (isStackQuestion) {
    return copy.responses.stack;
  }

  const matches = [
    has(['react', 'реакт']),
    has(['typescript', 'type script', 'ts', 'типизация']),
    has(['api', 'rest', 'data', 'fetch', 'данн', 'запрос']),
    has(['form', 'форм']),
    has(['zod', 'validation', 'валидац']),
    has(['query', 'server state', 'состояни']),
    has(['responsive', 'layout', 'адаптив', 'верст']),
    has(['ux', 'ui', 'interface', 'интерфейс']),
    has(['ai', 'ии', 'ollama']),
    has(['test', 'тест']),
  ].filter(Boolean).length;

  const projects = [
    copy.projectHints.marusya,
    copy.projectHints.portfolio,
    has([
      'form',
      'seller',
      'dashboard',
      'edit',
      'ai',
      'форм',
      'ии',
      'ollama',
      'личный кабинет',
    ])
      ? copy.projectHints.avito
      : copy.projectHints.vkTest,
  ];

  if (matches >= 5) {
    return {
      ...copy.responses.strong,
      projects,
    };
  }

  if (matches >= 2) {
    return {
      ...copy.responses.moderate,
      projects,
    };
  }

  return {
    ...copy.responses.empty,
    projects: [
      copy.projectHints.marusya,
      copy.projectHints.avito,
      copy.projectHints.portfolio,
    ],
  };
}

export function AIAssistantLauncher({
  className = '',
  panelId = 'ai-assistant-panel',
  isOpen,
  onClose,
  onToggle,
}: {
  className?: string;
  panelId?: string;
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  const { language } = useTranslation();
  const copy = assistantCopyByLanguage[language];
  const ui = uiCopy[language];
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<AssistantResponse>(
    copy.fallbackResponse,
  );
  const [responseSource, setResponseSource] =
    useState<AssistantSource>('initial');
  const [isThinking, setIsThinking] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (responseSource === 'initial') {
      setResponse(copy.fallbackResponse);
      return;
    }

    if (responseSource === 'fallback') {
      setResponse(
        input.trim()
          ? buildAssistantResponse(input, copy)
          : copy.fallbackResponse,
      );
    }
  }, [copy, input, responseSource]);

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const panel = panelRef.current;

      if (!panel) {
        return;
      }

      const focusableElements = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setResponse(buildAssistantResponse(prompt, copy));
    setResponseSource('fallback');
  };

  const handleSubmit = async () => {
    if (isThinking) {
      return;
    }

    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setResponse(copy.fallbackResponse);
      setResponseSource('initial');
      return;
    }

    setIsThinking(true);
    trackPortfolioEvent('ai_assistant_submit', {
      inputLength: trimmedInput.length,
    });

    try {
      const assistantResponse = await requestAssistantResponse(
        trimmedInput,
        language,
      );

      setResponse(assistantResponse);
      setResponseSource('ai');
      trackPortfolioEvent('ai_assistant_success');
    } catch {
      setResponse(buildAssistantResponse(trimmedInput, copy));
      setResponseSource('fallback');
      trackPortfolioEvent('ai_assistant_fallback');
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className={`ai-assistant${className ? ` ${className}` : ''}`}>
      <button
        ref={triggerRef}
        className="ai-assistant__trigger btn-reset"
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? ui.closeAssistant : ui.openAssistant}
        onClick={onToggle}
      >
        <span className="ai-assistant__face" aria-hidden="true">
          <span className="ai-assistant__eye ai-assistant__eye--left" />
          <span className="ai-assistant__eye ai-assistant__eye--right" />
        </span>
        <span className="ai-assistant__label" aria-hidden="true">
          AI
        </span>
      </button>

      {isOpen && (
        <>
          <button
            className="ai-assistant__backdrop btn-reset"
            type="button"
            aria-label={ui.closeAssistant}
            onClick={onClose}
          />

          <section
            ref={panelRef}
            className="ai-assistant__panel ai-assistant__panel--open"
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={ui.assistantAria}
          >
            <div className="ai-assistant__header">
              <span className="ai-assistant__icon" aria-hidden="true">
                <Bot size={22} strokeWidth={2.1} />
              </span>
              <div>
                <h2>{ui.title}</h2>
                <p>{ui.subtitle}</p>
              </div>
              <button
                ref={closeButtonRef}
                className="ai-assistant__close btn-reset"
                type="button"
                aria-label={ui.close}
                onClick={onClose}
              >
                <X size={20} strokeWidth={2.1} aria-hidden="true" />
              </button>
            </div>

            <div className="ai-assistant__notice">
              <Sparkles size={18} strokeWidth={2.1} aria-hidden="true" />
              <p>{ui.notice}</p>
            </div>

            <label className="ai-assistant__field">
              <span>{ui.fieldLabel}</span>
              <textarea
                value={input}
                placeholder={ui.inputPlaceholder}
                rows={5}
                onChange={(event) => setInput(event.target.value)}
              />
            </label>

            <div className="ai-assistant__prompts">
              {copy.quickPrompts.map((prompt) => (
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
              {isThinking ? ui.thinking : ui.submit}
            </button>

            <div
              className={`ai-assistant__result${isThinking ? ' ai-assistant__result--thinking' : ''}`}
              aria-live="polite"
            >
              <div className="ai-assistant__result-head">
                <CheckCircle2 size={18} strokeWidth={2.1} aria-hidden="true" />
                <span>
                  {isThinking ? ui.thinkingTitle : response.title}
                </span>
              </div>
              {!isThinking && (
                <span
                  className={`ai-assistant__source ai-assistant__source--${responseSource}`}
                >
                  {responseSource === 'ai'
                    ? ui.resultAi
                    : responseSource === 'fallback'
                      ? ui.resultFallback
                      : ui.resultInitial}
                </span>
              )}
              <p>
                {isThinking
                  ? ui.thinkingSummary
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
                    <span>{ui.projectsTitle}</span>
                    {response.projects.map((project) => (
                      <p key={project}>{project}</p>
                    ))}
                  </div>
                </>
              )}
            </div>

            <p className="ai-assistant__status">{ui.status}</p>
          </section>
        </>
      )}
    </div>
  );
}
