import {
  Activity,
  Brain,
  Code2,
  Dumbbell,
  Heart,
  Mail,
  MapPin,
  Music2,
  Send,
  Sparkles,
  Star,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import avatarImage from '../assets/avatar.png';
import { GitHubIcon } from '../shared/ui/BrandIcon/BrandIcon.tsx';
import './AboutPage.css';

const values = [
  {
    icon: Star,
    label: 'Ориентирован на качество',
    text: 'Не оставляю интерфейс в состоянии "и так сойдёт": проверяю детали, edge cases и поведение в разных состояниях.',
  },
  {
    icon: Brain,
    label: 'Думаю на шаг вперёд',
    text: 'Проектирую компоненты и данные так, чтобы код было проще расширять, тестировать и поддерживать.',
  },
  {
    icon: Heart,
    label: 'Делаю с заботой о пользователе',
    text: 'Смотрю на интерфейс через сценарии пользователя: что он видит, где может ошибиться и как быстро получает результат.',
  },
  {
    icon: Code2,
    label: 'Пишу понятный код',
    text: 'Предпочитаю явные структуры, типизацию и разделение ответственности вместо магии, которую страшно трогать.',
  },
  {
    icon: Activity,
    label: 'Развиваюсь системно',
    text: 'Изучаю новые инструменты не ради галочки, а чтобы лучше решать реальные задачи и быстрее приносить пользу.',
  },
  {
    icon: UserRound,
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

export function AboutPage() {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

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

          <div className={`about-page__more ${isMoreOpen ? 'about-page__more--open' : ''}`}>
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
            В работе опираюсь на React, TypeScript, REST API, React Query и Zod.
            Люблю компонентную архитектуру, предсказуемый data-flow, понятные
            состояния загрузки и ошибок, а также интерфейсы, в которых внимание
            к деталям чувствуется без лишнего шума.
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

          <div
            className="about-profile__avatar"
            aria-label="Аватар Владимира"
          >
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
            <Sparkles size={22} strokeWidth={2.1} />
          </span>
          <h2>Что для меня важно в работе</h2>
        </div>

        <ul className="about-values__grid list-reset">
          {values.map(({ icon: Icon, label, text }) => (
            <li className="about-values__item" key={label}>
              <span className="about-page__value-icon" aria-hidden="true">
                <Icon size={22} strokeWidth={2.1} />
              </span>
              <h3>{label}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container about-path">
        <div className="about-path__heading">
          <span className="about-path__icon" aria-hidden="true">
            <Activity size={22} strokeWidth={2.1} />
          </span>
          <h2 className="about-path__title">Мой путь во frontend</h2>
        </div>

        <ol className="about-path__timeline list-reset">
          {timeline.map((item) => (
            <li className="about-path__item" key={item.period}>
              <span className="about-path__dot" aria-hidden="true" />
              <p className="about-path__period">{item.period}</p>
              <h3 className="about-path__item-title">{item.title}</h3>
              <p className="about-path__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
