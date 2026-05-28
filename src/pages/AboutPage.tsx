import './AboutPage.css';

export function AboutPage() {
  return (
    <section className="container about-page">
      <p className="about-page__eyebrow">About</p>
      <h1 className="about-page__title">Обо мне</h1>
      <p className="about-page__text">
        Frontend-разработчик на React и TypeScript. Разрабатываю SPA с
        авторизацией, REST API и управлением server state. Работаю с React
        Query, Zod и компонентной архитектурой, уделяя внимание
        поддерживаемости и производительности.
      </p>
    </section>
  );
}
