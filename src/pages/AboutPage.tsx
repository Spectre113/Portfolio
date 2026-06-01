import {
  Activity,
  ArrowRight,
  Blocks,
  Bot,
  Braces,
  Briefcase,
  Cpu,
  Download,
  Dumbbell,
  Gauge,
  LayoutGrid,
  Mail,
  MapPin,
  MessageSquareCode,
  Music2,
  Rocket,
  Send,
  Target,
  WandSparkles,
  Workflow,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';
import { Link } from 'react-router-dom';
import avatarImage from '../assets/avatar.png';
import { GitHubIcon } from '../shared/ui/BrandIcon/BrandIcon.tsx';
import './AboutPage.css';

const resumeUrl = `${import.meta.env.BASE_URL}resume-vladimir-toporkov.pdf`;

const values = [
  {
    icon: Target,
    label: 'Ориентирован на качество',
    text: 'Не оставляю интерфейс в состоянии "и так сойдёт": проверяю детали, edge cases и поведение в разных состояниях.',
  },
  {
    icon: LayoutGrid,
    label: 'Думаю на шаг вперёд',
    text: 'Проектирую компоненты и данные так, чтобы код было проще расширять, тестировать и поддерживать.',
  },
  {
    icon: Braces,
    label: 'Делаю с заботой о пользователе',
    text: 'Смотрю на интерфейс через сценарии пользователя: что он видит, где может ошибиться и как быстро получает результат.',
  },
  {
    icon: Rocket,
    label: 'Пишу понятный код',
    text: 'Предпочитаю явные структуры, типизацию и разделение ответственности вместо магии, которую страшно трогать.',
  },
  {
    icon: Gauge,
    label: 'Развиваюсь системно',
    text: 'Изучаю новые инструменты не ради галочки, а чтобы лучше решать реальные задачи и быстрее приносить пользу.',
  },
  {
    icon: Workflow,
    label: 'Умею слышать контекст',
    text: 'Для меня важно понять задачу, ограничения и ожидания команды до того, как писать решение.',
  },
];

const interests = [
  {
    icon: Activity,
    label: 'Системы реального времени',
  },
  {
    icon: Dumbbell,
    label: 'Тренировки',
  },
  {
    icon: Music2,
    label: 'Игра на пианино',
  },
];

const timeline = [
  {
    period: 'До 2024',
    title: 'Первые шаги',
    text: 'Изучал основы HTML, CSS и JavaScript, собирал первые статические проекты и постепенно разбирался, как устроена веб-разработка.',
  },
  {
    period: '2025',
    title: 'React и TypeScript',
    text: 'Начал системно изучать React и TypeScript, переносить логику интерфейсов в компоненты и работать с типизированным frontend-кодом.',
  },
  {
    period: 'Конец 2025',
    title: 'Pet-проект на React',
    text: 'Перешёл к созданию pet-проекта с использованием React: продумывал архитектуру, состояние, API-взаимодействие и пользовательские сценарии.',
  },
  {
    period: '2026 и далее',
    title: 'Рост и практика',
    text: 'Продолжаю развиваться во frontend: углубляюсь в server state, валидацию данных, производительность, доступность и качество интерфейсов.',
  },
];

const aiWorkflow = [
  {
    icon: Bot,
    label: 'Идеи и варианты решений',
    text: 'Использую AI как собеседника, чтобы быстрее проверить несколько направлений и выбрать самое внятное.',
  },
  {
    icon: MessageSquareCode,
    label: 'Черновики компонентов',
    text: 'Могу набросать структуру, но финальную архитектуру, типы и поведение всегда довожу руками.',
  },
  {
    icon: Workflow,
    label: 'Рефакторинг и читаемость',
    text: 'Прошу подсветить слабые места, после чего сам принимаю решение, что улучшать и почему.',
  },
  {
    icon: WandSparkles,
    label: 'Ускорение рутины',
    text: 'Доверяю AI повторяемые задачи, но ответственность за качество, UX и поддержку оставляю за собой.',
  },
];

type TimelineRevealState = {
  characters: number;
  stepIndex: number;
};

const TIMELINE_TYPE_SPEED = 30;
const TIMELINE_STEP_PAUSE = 0;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

function useTimelineReveal(
  items: typeof timeline,
  sectionRef: RefObject<HTMLElement | null>,
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const [state, setState] = useState<TimelineRevealState>({
    characters: 0,
    stepIndex: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.38,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  useEffect(() => {
    if (prefersReducedMotion || !isInView || state.stepIndex >= items.length) {
      return;
    }

    const currentTextLength = items[state.stepIndex].text.length;
    const isStepTextComplete = state.characters >= currentTextLength;
    const delay = isStepTextComplete
      ? TIMELINE_STEP_PAUSE
      : TIMELINE_TYPE_SPEED;

    const timeout = window.setTimeout(() => {
      setState((currentState) => {
        const textLength = items[currentState.stepIndex]?.text.length ?? 0;

        if (currentState.characters < textLength) {
          return {
            ...currentState,
            characters: currentState.characters + 1,
          };
        }

        return {
          characters: 0,
          stepIndex: currentState.stepIndex + 1,
        };
      });
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isInView, items, prefersReducedMotion, state]);

  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        items: items.map((item) => ({
          ...item,
          isActive: true,
          isVisible: true,
          text: item.text,
        })),
        progress: 100,
      };
    }

    const stepIndex = Math.min(state.stepIndex, items.length - 1);
    const currentTextLength = items[stepIndex]?.text.length ?? 1;
    const stepProgress =
      state.stepIndex >= items.length
        ? 1
        : Math.min(state.characters / currentTextLength, 1);
    const progress =
      state.stepIndex >= items.length
        ? 100
        : ((stepIndex + stepProgress) / items.length) * 100;

    return {
      items: items.map((item, index) => {
        const isPast = index < state.stepIndex;
        const isCurrent = index === state.stepIndex;

        return {
          ...item,
          isActive: index <= state.stepIndex,
          isVisible: isPast || isCurrent,
          text: isPast
            ? item.text
            : isCurrent
              ? item.text.slice(0, state.characters)
              : '',
        };
      }),
      progress,
    };
  }, [items, prefersReducedMotion, state]);
}

export function AboutPage() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const timelineSectionRef = useRef<HTMLElement | null>(null);
  const timelineReveal = useTimelineReveal(timeline, timelineSectionRef);

  return (
    <main className="about-page">
      <section className="container about-page__hero">
        <p className="about-page__eyebrow">
          <span aria-hidden="true" />
          Обо мне
        </p>

        <div className="about-page__content">
          <h1 className="about-page__title">
            Обо <span>мне</span>
          </h1>

          <p className="about-page__lead">
            Я frontend-разработчик, который превращает сложную логику в
            понятные, аккуратные и поддерживаемые интерфейсы. Мне важно не
            просто сверстать экран, а сделать так, чтобы продуктом было удобно
            пользоваться и дальше развивать его без боли.
          </p>

          <div className="about-page__person">
            <div>
              <h2 className="about-page__name">Владимир Топорков</h2>
              <p className="about-page__role">Frontend Developer</p>
            </div>

            <ul className="about-page__contacts list-reset">
              <li>
                <MapPin size={18} strokeWidth={2} aria-hidden="true" />
                Россия, Иннополис
              </li>
              <li>
                <Mail size={18} strokeWidth={2} aria-hidden="true" />
                VTvolody626@gmail.com
              </li>
              <li>
                <Send size={18} strokeWidth={2} aria-hidden="true" />
                @Spectre113
              </li>
              <li>
                <GitHubIcon />
                github.com/Spectre113
              </li>
            </ul>
          </div>

          <div
            className={`about-page__more ${isMoreOpen ? 'about-page__more--open' : ''}`}
          >
            <button
              className="about-page__more-button"
              type="button"
              aria-expanded={isMoreOpen}
              onClick={() => setIsMoreOpen((currentValue) => !currentValue)}
            >
              {isMoreOpen ? 'Скрыть подробности' : 'Показать подробнее'}
            </button>
            <div className="about-page__more-content">
              <div className="about-page__more-inner">
                <p className="about-page__text">
                  В работе опираюсь на React, TypeScript, REST API, React Query
                  и Zod. Люблю компонентную архитектуру, предсказуемый
                  data-flow, понятные состояния загрузки и ошибок, а также
                  интерфейсы, в которых внимание к деталям чувствуется без
                  лишнего шума.
                </p>
                <div className="about-page__outside">
                  <p>Вне кода:</p>
                  <ul className="about-page__interests list-reset">
                    {interests.map(({ icon: Icon, label }) => (
                      <li key={label}>
                        <Icon size={18} strokeWidth={2.1} aria-hidden="true" />
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <article className="about-profile">
          <div className="about-profile__info">
            <div>
              <h2 className="about-profile__name">Владимир Топорков</h2>
              <p className="about-profile__role">Frontend Developer</p>
            </div>

            <ul className="about-profile__contacts list-reset">
              <li>
                <MapPin size={18} strokeWidth={2} aria-hidden="true" />
                Россия, Иннополис
              </li>
              <li>
                <Mail size={18} strokeWidth={2} aria-hidden="true" />
                VTvolody626@gmail.com
              </li>
              <li>
                <Send size={18} strokeWidth={2} aria-hidden="true" />
                @Spectre113
              </li>
              <li>
                <GitHubIcon />
                github.com/Spectre113
              </li>
            </ul>
          </div>

          <div className="about-profile__avatar" aria-label="Аватар Владимира">
            <img src={avatarImage} alt="" aria-hidden="true" />
          </div>

          <div className="about-profile__footer">
            <p>Вне кода:</p>
            <ul className="about-profile__interests list-reset">
              {interests.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon size={18} strokeWidth={2.1} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="container about-values">
        <div className="about-values__heading">
          <span className="about-page__value-icon" aria-hidden="true">
            <Blocks size={22} strokeWidth={2.1} />
          </span>
          <h2>Мой подход к разработке</h2>
        </div>

        <div className="about-values__body">
          <ul className="about-values__grid list-reset">
            {values.slice(0, 4).map(({ icon: Icon, label, text }) => (
              <li className="about-values__item" key={label}>
                <span className="about-page__value-icon" aria-hidden="true">
                  <Icon size={22} strokeWidth={2.1} />
                </span>
                <h3>{label}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ul>

          <div className="about-ai">
            <div className="about-ai__intro">
              <span className="about-page__value-icon" aria-hidden="true">
                <Cpu size={22} strokeWidth={2.1} />
              </span>
              <div>
                <h3>AI в рабочем процессе</h3>
                <p>
                  AI для меня — это ассистент для ускорения рутины и поиска
                  идей, а не замена пониманию задачи, архитектуры и качества
                  результата.
                </p>
              </div>
            </div>

            <ul className="about-ai__grid list-reset">
              {aiWorkflow.map(({ icon: Icon, label, text }) => (
                <li className="about-ai__item" key={label}>
                  <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
                  <div>
                    <h4>{label}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="about-ai__note">
              AI помогает двигаться быстрее, но ответственность за архитектуру,
              логику, UX и финальный код всегда остается на мне.
            </p>
          </div>
        </div>
      </section>

      <section
        className="container about-path"
        ref={timelineSectionRef}
        style={
          {
            '--timeline-progress': `${timelineReveal.progress}%`,
          } as CSSProperties
        }
      >
        <div className="about-path__heading">
          <span className="about-path__icon" aria-hidden="true">
            <Activity size={22} strokeWidth={2.1} />
          </span>
          <h2 className="about-path__title">Мой путь во frontend</h2>
        </div>

        <ol className="about-path__timeline list-reset">
          {timelineReveal.items.map((item) => (
            <li
              className={`about-path__item ${item.isActive ? 'about-path__item--active' : ''} ${
                item.isVisible ? 'about-path__item--visible' : ''
              }`}
              key={item.period}
            >
              <span className="about-path__dot" aria-hidden="true" />
              <p className="about-path__period">{item.period}</p>
              <h3 className="about-path__item-title">{item.title}</h3>
              <p className="about-path__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container about-now">
        <div className="about-now__content">
          <div className="about-now__heading">
            <span className="about-path__icon" aria-hidden="true">
              <Briefcase size={22} strokeWidth={2.1} />
            </span>
            <h2>Что ищу сейчас</h2>
          </div>

          <p>
            Ищу возможности для frontend-стажировки или позиции
            junior-разработчика, где смогу приносить пользу команде, учиться у
            сильных коллег и расти профессионально.
          </p>

          <div className="about-now__actions">
            <Link
              className="about-now__button about-now__button--primary"
              to="/projects"
            >
              Смотреть проекты
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </Link>
            <a
              className="about-now__button"
              href={resumeUrl}
              download="Vladimir-Toporkov-Frontend-Developer.pdf"
            >
              Скачать резюме
              <Download size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a className="about-now__telegram" href="https://t.me/Spectre113">
              Связаться со мной в Telegram
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="about-now__visual" aria-hidden="true">
          <span className="about-now__door" />
          <span className="about-now__step about-now__step--top" />
          <span className="about-now__step about-now__step--middle" />
          <span className="about-now__step about-now__step--bottom" />
        </div>
      </section>
    </main>
  );
}
