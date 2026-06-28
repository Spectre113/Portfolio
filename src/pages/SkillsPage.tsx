import {
  Activity,
  AlertCircle,
  ArrowRight,
  Blocks,
  Braces,
  CheckCircle2,
  Code2,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  KeyRound,
  Layers3,
  Loader2,
  MonitorSmartphone,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Server,
  TestTube2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import { useTranslation } from '../shared/i18n/useTranslation.ts';
import type { Language } from '../shared/language/language-context.ts';
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

type DirectionCard = {
  brand?: 'react' | 'typescript';
  icon: LucideIcon;
  points: string[];
  text: string;
  title: string;
};

type TextCard = {
  icon: LucideIcon;
  text: string;
  title: string;
};

type WorkflowColumn = {
  icon: LucideIcon;
  points: string[];
  title: string;
};

type SkillsContent = {
  directionCards: DirectionCard[];
  growthCards: TextCard[];
  taskCards: TextCard[];
  workflowColumns: WorkflowColumn[];
};

const directionCardsRu: DirectionCard[] = [
  {
    brand: 'react',
    icon: Code2,
    title: 'React и компонентная архитектура',
    text: 'Строю интерфейс из изолированных компонентов, чтобы логику, состояние и UI можно было развивать без постоянного переписывания.',
    points: [
      'композиция компонентов',
      'хуки и состояние',
      'разделение ответственности',
      'переиспользуемые UI-паттерны',
    ],
  },
  {
    brand: 'typescript',
    icon: Braces,
    title: 'TypeScript и типизация',
    text: 'Использую типы как инструмент поддержки проекта: меньше неявных контрактов, проще рефакторинг и понятнее работа с данными.',
    points: [
      'типы для API и моделей',
      'безопасные props и hooks',
      'контракты данных',
      'типизация сценариев UI',
    ],
  },
  {
    icon: Server,
    title: 'API, данные и server state',
    text: 'Подключаю REST API, обрабатываю загрузку, ошибки и обновления так, чтобы интерфейс оставался предсказуемым для пользователя.',
    points: [
      'React Query / TanStack',
      'loading и error states',
      'кеширование данных',
      'нормализация ответа',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Валидация и надежность',
    text: 'Проверяю внешние данные на границе приложения, чтобы UI не зависел от предположений о серверном ответе.',
    points: [
      'Zod-схемы',
      'graceful fallback',
      'явные ошибки',
      'защита от пустых состояний',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Адаптивность и UX',
    text: 'Делаю интерфейсы, которые адекватно работают на разных экранах, не ломают сценарии и не заставляют пользователя угадывать.',
    points: [
      'mobile-first проверки',
      'доступные состояния',
      'понятная иерархия',
      'аккуратная анимация',
    ],
  },
];

const taskCardsRu: TextCard[] = [
  {
    icon: Route,
    title: 'SPA и маршрутизация',
    text: 'Собираю страницы и пользовательские сценарии так, чтобы навигация была понятной, а структура проекта не превращалась в хаос.',
  },
  {
    icon: KeyRound,
    title: 'Авторизация и доступ',
    text: 'Продумываю состояние пользователя, защищенные сценарии и поведение интерфейса при разных правах доступа.',
  },
  {
    icon: Database,
    title: 'Работа с API',
    text: 'Подключаю данные, обрабатываю ошибки и синхронизирую UI с серверным состоянием без лишних перерендеров.',
  },
  {
    icon: FileCode2,
    title: 'Формы и валидация',
    text: 'Делаю формы с понятной обратной связью, стабильной валидацией и без скачков интерфейса при ошибках.',
  },
  {
    icon: Search,
    title: 'Фильтрация и поиск',
    text: 'Собираю интерфейсы для работы со списками: фильтры, поиск, пустые состояния и сохранение контекста.',
  },
  {
    icon: Blocks,
    title: 'UI-состояния',
    text: 'Прорабатываю loading, empty, error и success, чтобы приложение не выглядело сломанным между запросами.',
  },
];

const workflowColumnsRu: WorkflowColumn[] = [
  {
    icon: MonitorSmartphone,
    title: 'Интерфейс',
    points: [
      'разбиваю экран на компоненты',
      'держу визуальную иерархию',
      'проверяю адаптивность',
      'добавляю понятную обратную связь',
    ],
  },
  {
    icon: Database,
    title: 'Данные',
    points: [
      'подключаю API',
      'валидирую ответ через Zod',
      'обрабатываю loading и error',
      'синхронизирую server state',
    ],
  },
  {
    icon: GitBranch,
    title: 'Поддержка',
    points: [
      'выделяю reusable-логику',
      'держу структуру модулей',
      'пишу предсказуемые hooks',
      'оставляю место для роста',
    ],
  },
];

const growthCardsRu: TextCard[] = [
  {
    icon: TestTube2,
    title: 'Тестирование',
    text: 'Хочу увереннее покрывать критичные сценарии и проверять поведение интерфейса, а не только отсутствие ошибок сборки.',
  },
  {
    icon: Activity,
    title: 'Доступность',
    text: 'Развиваю привычку смотреть на интерфейс шире: клавиатура, фокус, контраст, семантика и понятные состояния.',
  },
  {
    icon: Gauge,
    title: 'Производительность',
    text: 'Разбираюсь, где действительно нужны оптимизации, а где важнее простая архитектура и чистый data-flow.',
  },
  {
    icon: Sparkles,
    title: 'AI-assisted workflow',
    text: 'Использую AI как ускоритель рутины и генератор вариантов, но архитектурные решения и качество оставляю за собой.',
  },
];

const directionCardsEn: DirectionCard[] = [
  {
    brand: 'react',
    icon: Code2,
    title: 'React and component architecture',
    text: 'I build UI from isolated components so logic, state and visuals can evolve without constant rewrites.',
    points: [
      'component composition',
      'hooks and state',
      'separated responsibilities',
      'reusable UI patterns',
    ],
  },
  {
    brand: 'typescript',
    icon: Braces,
    title: 'TypeScript and typing',
    text: 'I use types as a project support tool: fewer implicit contracts, easier refactoring and clearer data handling.',
    points: [
      'types for API and models',
      'safe props and hooks',
      'data contracts',
      'typed UI scenarios',
    ],
  },
  {
    icon: Server,
    title: 'API, data and server state',
    text: 'I connect REST APIs and handle loading, errors and updates so the UI stays predictable for the user.',
    points: [
      'React Query / TanStack',
      'loading and error states',
      'data caching',
      'response normalization',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Validation and reliability',
    text: 'I validate external data at the application boundary so the UI does not depend on assumptions about server responses.',
    points: [
      'Zod schemas',
      'graceful fallback',
      'explicit errors',
      'empty state protection',
    ],
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive UI and UX',
    text: 'I make interfaces that work across screens, preserve user flows and do not force people to guess what happened.',
    points: [
      'mobile-first checks',
      'accessible states',
      'clear hierarchy',
      'careful animation',
    ],
  },
];

const taskCardsEn: TextCard[] = [
  {
    icon: Route,
    title: 'SPA and routing',
    text: 'I assemble pages and user flows so navigation is clear and the project structure does not turn into chaos.',
  },
  {
    icon: KeyRound,
    title: 'Auth and access',
    text: 'I think through user state, protected flows and UI behavior for different access levels.',
  },
  {
    icon: Database,
    title: 'API work',
    text: 'I connect data, handle errors and sync UI with server state without unnecessary rerenders.',
  },
  {
    icon: FileCode2,
    title: 'Forms and validation',
    text: 'I build forms with clear feedback, stable validation and no layout jumps when errors appear.',
  },
  {
    icon: Search,
    title: 'Filtering and search',
    text: 'I build list interfaces: filters, search, empty states and context preservation.',
  },
  {
    icon: Blocks,
    title: 'UI states',
    text: 'I work through loading, empty, error and success states so the app does not look broken between requests.',
  },
];

const workflowColumnsEn: WorkflowColumn[] = [
  {
    icon: MonitorSmartphone,
    title: 'Interface',
    points: [
      'split screens into components',
      'keep visual hierarchy',
      'check responsiveness',
      'add clear feedback',
    ],
  },
  {
    icon: Database,
    title: 'Data',
    points: [
      'connect APIs',
      'validate responses with Zod',
      'handle loading and error',
      'sync server state',
    ],
  },
  {
    icon: GitBranch,
    title: 'Maintainability',
    points: [
      'extract reusable logic',
      'keep module structure',
      'write predictable hooks',
      'leave room for growth',
    ],
  },
];

const growthCardsEn: TextCard[] = [
  {
    icon: TestTube2,
    title: 'Testing',
    text: 'I want to cover critical scenarios more confidently and test UI behavior, not only build success.',
  },
  {
    icon: Activity,
    title: 'Accessibility',
    text: 'I build the habit of looking wider: keyboard, focus, contrast, semantics and clear states.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    text: 'I learn where optimizations are truly useful and where simple architecture and clean data flow matter more.',
  },
  {
    icon: Sparkles,
    title: 'AI-assisted workflow',
    text: 'I use AI to speed up routine work and generate options, while keeping architecture decisions and quality on my side.',
  },
];

const skillsContentByLanguage = {
  ru: {
    directionCards: directionCardsRu,
    growthCards: growthCardsRu,
    taskCards: taskCardsRu,
    workflowColumns: workflowColumnsRu,
  },
  en: {
    directionCards: directionCardsEn,
    growthCards: growthCardsEn,
    taskCards: taskCardsEn,
    workflowColumns: workflowColumnsEn,
  },
} satisfies Record<Language, SkillsContent>;

export function SkillsPage() {
  const { language, t } = useTranslation();
  const {
    directionCards,
    growthCards,
    taskCards,
    workflowColumns,
  } = skillsContentByLanguage[language];

  return (
    <main className="skills-page">
      <section className="container skills-page__hero">
        <div className="skills-page__content">
          <p className="skills-page__eyebrow">
            <span aria-hidden="true" />
            {t('nav.skills')}
          </p>

          <h1 className="skills-page__title">
            {t('nav.skills')} <span>{t('skillsPage.heroAccent')}</span>
          </h1>

          <p className="skills-page__lead">{t('skillsPage.heroLead')}</p>

          <ul className="skills-page__highlights list-reset">
            <li>
              <GitBranch size={22} strokeWidth={2.1} aria-hidden="true" />
              {t('skillsPage.heroHighlight1')}
            </li>
            <li>
              <Layers3 size={22} strokeWidth={2.1} aria-hidden="true" />
              {t('skillsPage.heroHighlight2')}
            </li>
            <li>
              <Sparkles size={22} strokeWidth={2.1} aria-hidden="true" />
              {t('skillsPage.heroHighlight3')}
            </li>
          </ul>
        </div>

        <SkillFlowAnimation />
      </section>

      <SkillsDirectionsSection directionCards={directionCards} />
      <SkillsPracticeSection
        growthCards={growthCards}
        taskCards={taskCards}
        workflowColumns={workflowColumns}
      />
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

function SkillsDirectionsSection({
  directionCards,
}: {
  directionCards: DirectionCard[];
}) {
  const { t } = useTranslation();

  return (
    <section className="container skills-panel skills-directions">
      <div className="skills-panel__header">
        <span className="skills-panel__icon" aria-hidden="true">
          <Layers3 size={22} strokeWidth={2.1} />
        </span>
        <h2>{t('skillsPage.directionsTitle')}</h2>
      </div>

      <div className="skills-directions__grid">
        {directionCards.map(({ brand, icon: Icon, title, text, points }) => (
          <article className="skills-direction-card" key={title}>
            <span className="skills-direction-card__icon" aria-hidden="true">
              {brand ? (
                <SkillBrandIcon brand={brand as 'react' | 'typescript'} />
              ) : (
                <Icon size={30} strokeWidth={2} />
              )}
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
            <ul className="skills-direction-card__list list-reset">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function SkillBrandIcon({ brand }: { brand: 'react' | 'typescript' }) {
  if (brand === 'typescript') {
    return <span className="skills-brand skills-brand--typescript">TS</span>;
  }

  return (
    <svg
      className="skills-brand skills-brand--react"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M18.6789 15.9759C18.6789 14.5415 17.4796 13.3785 16 13.3785C14.5206 13.3785 13.3211 14.5415 13.3211 15.9759C13.3211 17.4105 14.5206 18.5734 16 18.5734C17.4796 18.5734 18.6789 17.4105 18.6789 15.9759Z"
        fill="#53C1DE"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.7004 11.1537C25.2661 8.92478 25.9772 4.79148 23.4704 3.39016C20.9753 1.99495 17.7284 4.66843 16.0139 6.27318C14.3044 4.68442 10.9663 2.02237 8.46163 3.42814C5.96751 4.82803 6.73664 8.8928 7.3149 11.1357C4.98831 11.7764 1 13.1564 1 15.9759C1 18.7874 4.98416 20.2888 7.29698 20.9289C6.71658 23.1842 5.98596 27.1909 8.48327 28.5877C10.9973 29.9932 14.325 27.3945 16.0554 25.7722C17.7809 27.3864 20.9966 30.0021 23.4922 28.6014C25.9956 27.1963 25.3436 23.1184 24.7653 20.8625C27.0073 20.221 31 18.7523 31 15.9759C31 13.1835 26.9903 11.7923 24.7004 11.1537ZM24.4162 19.667C24.0365 18.5016 23.524 17.2623 22.8971 15.9821C23.4955 14.7321 23.9881 13.5088 24.3572 12.3509C26.0359 12.8228 29.7185 13.9013 29.7185 15.9759C29.7185 18.07 26.1846 19.1587 24.4162 19.667ZM22.85 27.526C20.988 28.571 18.2221 26.0696 16.9478 24.8809C17.7932 23.9844 18.638 22.9422 19.4625 21.7849C20.9129 21.6602 22.283 21.4562 23.5256 21.1777C23.9326 22.7734 24.7202 26.4763 22.85 27.526ZM9.12362 27.5111C7.26143 26.47 8.11258 22.8946 8.53957 21.2333C9.76834 21.4969 11.1286 21.6865 12.5824 21.8008C13.4123 22.9332 14.2816 23.9741 15.1576 24.8857C14.0753 25.9008 10.9945 28.557 9.12362 27.5111ZM2.28149 15.9759C2.28149 13.874 5.94207 12.8033 7.65904 12.3326C8.03451 13.5165 8.52695 14.7544 9.12123 16.0062C8.51925 17.2766 8.01977 18.5341 7.64085 19.732C6.00369 19.2776 2.28149 18.0791 2.28149 15.9759ZM9.1037 4.50354C10.9735 3.45416 13.8747 6.00983 15.1159 7.16013C14.2444 8.06754 13.3831 9.1006 12.5603 10.2265C11.1494 10.3533 9.79875 10.5569 8.55709 10.8297C8.09125 9.02071 7.23592 5.55179 9.1037 4.50354ZM20.3793 11.5771C21.3365 11.6942 22.2536 11.85 23.1147 12.0406C22.8562 12.844 22.534 13.6841 22.1545 14.5453C21.6044 13.5333 21.0139 12.5416 20.3793 11.5771ZM16.0143 8.0481C16.6054 8.66897 17.1974 9.3623 17.7798 10.1145C16.5985 10.0603 15.4153 10.0601 14.234 10.1137C14.8169 9.36848 15.414 8.67618 16.0143 8.0481ZM9.8565 14.5444C9.48329 13.6862 9.16398 12.8424 8.90322 12.0275C9.75918 11.8418 10.672 11.69 11.623 11.5748C10.9866 12.5372 10.3971 13.5285 9.8565 14.5444ZM11.6503 20.4657C10.6679 20.3594 9.74126 20.2153 8.88556 20.0347C9.15044 19.2055 9.47678 18.3435 9.85796 17.4668C10.406 18.4933 11.0045 19.4942 11.6503 20.4657ZM16.0498 23.9915C15.4424 23.356 14.8365 22.6531 14.2448 21.8971C15.4328 21.9423 16.6231 21.9424 17.811 21.891C17.2268 22.6608 16.6369 23.3647 16.0498 23.9915ZM22.1667 17.4222C22.5677 18.3084 22.9057 19.1657 23.1742 19.9809C22.3043 20.1734 21.3652 20.3284 20.3757 20.4435C21.015 19.4607 21.6149 18.4536 22.1667 17.4222ZM18.7473 20.5941C16.9301 20.72 15.1016 20.7186 13.2838 20.6044C12.2509 19.1415 11.3314 17.603 10.5377 16.0058C11.3276 14.4119 12.2404 12.8764 13.2684 11.4158C15.0875 11.2825 16.9178 11.2821 18.7369 11.4166C19.7561 12.8771 20.6675 14.4086 21.4757 15.9881C20.6771 17.5812 19.7595 19.1198 18.7473 20.5941ZM22.8303 4.4666C24.7006 5.51254 23.8681 9.22726 23.4595 10.8426C22.2149 10.5641 20.8633 10.3569 19.4483 10.2281C18.6239 9.09004 17.7698 8.05518 16.9124 7.15949C18.1695 5.98441 20.9781 3.43089 22.8303 4.4666Z"
        fill="#53C1DE"
      />
    </svg>
  );
}

function SkillsPracticeSection({
  growthCards,
  taskCards,
  workflowColumns,
}: {
  growthCards: TextCard[];
  taskCards: TextCard[];
  workflowColumns: WorkflowColumn[];
}) {
  const { t } = useTranslation();

  return (
    <section className="container skills-practice">
      <article className="skills-panel skills-workflow">
        <div className="skills-panel__header">
          <span className="skills-panel__icon" aria-hidden="true">
            <GitBranch size={22} strokeWidth={2.1} />
          </span>
          <h2>{t('skillsPage.practiceTitle')}</h2>
        </div>

        <div className="skills-workflow__columns">
          {workflowColumns.map(({ icon: Icon, title, points }) => (
            <section className="skills-workflow__column" key={title}>
              <div className="skills-workflow__title">
                <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
                <h3>{title}</h3>
              </div>
              <ul className="list-reset">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>

      <article className="skills-panel skills-practice__tasks">
        <div className="skills-panel__header">
          <span className="skills-panel__icon" aria-hidden="true">
            <Route size={22} strokeWidth={2.1} />
          </span>
          <h2>{t('skillsPage.tasksTitle')}</h2>
        </div>

        <div className="skills-task-grid">
          {taskCards.map(({ icon: Icon, title, text }) => (
            <article className="skills-task-card" key={title}>
              <Icon size={28} strokeWidth={2} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </article>

      <article className="skills-panel skills-growth">
        <div className="skills-panel__header">
          <span className="skills-panel__icon" aria-hidden="true">
            <Sparkles size={22} strokeWidth={2.1} />
          </span>
          <h2>{t('skillsPage.growthTitle')}</h2>
        </div>

        <div className="skills-growth__grid">
          {growthCards.map(({ icon: Icon, title, text }) => (
            <article className="skills-growth-card" key={title}>
              <Icon size={30} strokeWidth={2} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
