# Portfolio

[English version](README.en.md)

Персональный сайт-портфолио frontend-разработчика Владимира Топоркова. Это не статичная визитка, а полноценное React-приложение с роутингом, страницами проектов, разделами обо мне и навыках, контактной формой, аналитикой событий, мультиязычностью и AI-помощником для быстрого разбора вакансий.

**Live:** [https://portfolio-delta-umber-48.vercel.app/](https://portfolio-delta-umber-48.vercel.app/)

**Репозиторий:** [github.com/Spectre113/Portfolio](https://github.com/Spectre113/Portfolio)

## О проекте

Портфолио показывает мой практический frontend-подход: компонентную архитектуру, типизированные контракты данных, работу с API, предсказуемые UI-состояния, адаптивную верстку, доступные интерактивные элементы и внимание к тому, как сайт ведет себя в реальных пользовательских сценариях.

Главная страница быстро отвечает на вопросы рекрутера: кто я, чем занимаюсь, какие проекты стоит посмотреть, где скачать резюме и как связаться. Отдельные страницы раскрывают проекты, опыт, навыки и рабочий подход подробнее.

## Возможности

- Многостраничное SPA: главная, проекты, обо мне, навыки
- RU/EN интерфейс с определением языка браузера и сохранением выбора в `localStorage`
- Светлая и темная тема с сохранением выбора пользователя
- Адаптивная шапка с мобильным меню, переключателями языка/темы и AI-кнопкой
- Hero-блок с интерактивной code-card и typewriter-анимацией
- Каталог проектов с поиском, фильтрами, подробными карточками, GitHub-ссылками и демо
- Главная карусель проектов на Embla Carousel с поддержкой `prefers-reduced-motion`
- Страница навыков с визуальной runtime-анимацией и структурой по направлениям
- Страница "Обо мне" с раскрываемыми деталями, профилем, timeline и блоком AI workflow
- Контактная модалка с валидацией, форматированием телефона и отправкой через Formspree
- AI-помощник по портфолио через Vercel serverless endpoint и Groq API
- Локальный fallback для AI-помощника, если модель временно недоступна
- Rate limit и базовая защита serverless endpoint
- Данные проектов из GitHub API с локальным fallback
- SEO meta, canonical, Open Graph image, `sitemap.xml`, `robots.txt`
- Vercel Analytics и кастомные события для ключевых действий
- Lazy loading страниц через `React.lazy` и `Suspense`
- Скачивание резюме в PDF
- Unit-тесты для поиска проектов и контактной формы

## AI-помощник

AI-помощник помогает посетителю быстро понять, какие навыки и проекты лучше подходят под конкретную вакансию или запрос. Он умеет:

- разобрать описание вакансии;
- подсказать, какие проекты показать HR;
- кратко описать опыт;
- объяснить стек проекта;
- отвечать на русском или английском языке в зависимости от выбранного языка интерфейса.

Клиентская часть не хранит API-ключ. Запрос идет на `/api/assistant`, а serverless function уже обращается к Groq API. Если ключ не задан, лимит превышен или модель недоступна, интерфейс показывает локальный fallback-ответ.

## Стек

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Lucide React
- Embla Carousel
- Vitest
- Vercel Functions
- Vercel Analytics
- Groq API
- Formspree

## Архитектура

Проект организован близко к Feature-Sliced Design:

- `src/app` - провайдеры и маршрутизация
- `src/pages` - страницы маршрутов
- `src/widgets` - крупные секции и виджеты интерфейса
- `src/entities` - модель проектов, API и hooks
- `src/shared` - общие утилиты, UI, тема, язык, аналитика
- `api` - Vercel serverless functions
- `public` - статические файлы, резюме, favicon, sitemap, robots.txt, OG image

## Запуск локально

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Для проверки production-сборки:

```bash
npm run build
npm run preview
```

Для запуска serverless endpoint локально используйте Vercel CLI:

```bash
npx vercel dev
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните значения:

```bash
cp .env.example .env.local
```

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.1-8b-instant
```

`VITE_FORMSPREE_ENDPOINT` доступен на клиенте и используется контактной формой.

`GROQ_API_KEY` должен оставаться только на серверной стороне. Не добавляйте к нему префикс `VITE_`.

`GROQ_MODEL` необязателен. Если переменная не задана, используется `llama-3.1-8b-instant`.

## Скрипты

| Команда           | Описание                            |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Запуск dev-сервера Vite             |
| `npm run build`   | TypeScript-проверка и production-сборка |
| `npm run preview` | Локальный preview production-сборки |
| `npm run lint`    | Запуск ESLint                       |
| `npm run test`    | Запуск тестов Vitest                |

## Деплой

Проект рассчитан на деплой в Vercel.

Настройки:

- Framework Preset - `Vite`
- Build Command - `npm run build`
- Output Directory - `dist`
- Install Command - стандартный для npm
- SPA-роутинг настроен через `vercel.json`

Production-переменные в Vercel Dashboard:

| Переменная                | Обязательна | Описание                                |
| ------------------------- | ----------- | --------------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | да          | Endpoint Formspree для контактной формы |
| `GROQ_API_KEY`            | да          | API-ключ Groq для AI-помощника          |
| `GROQ_MODEL`              | нет         | Модель Groq                             |

## SEO и аналитика

В проекте настроены:

- базовые meta-теги в `index.html`;
- canonical URL;
- Open Graph и Twitter preview через `public/og-image.svg`;
- `public/sitemap.xml`;
- `public/robots.txt`;
- Vercel Analytics;
- кастомные события для открытия контактов, AI-помощника, демо, GitHub и скачивания резюме.

## Тесты

Тесты покрывают:

- поиск и фильтрацию проектов;
- helper-функции контактной формы;
- валидацию контактов через email или телефон.

Запуск:

```bash
npm run test
```

## Производительность

Страницы загружаются лениво через `React.lazy` и `Suspense`, поэтому код разделов `projects`, `about` и `skills` не попадает целиком в стартовую загрузку. Изображения проектов на карточках используют `loading="lazy"`.

Для дальнейшей оптимизации можно дополнительно сжать тяжелые изображения проектов и вынести крупные интерактивные виджеты в отдельные lazy chunks.
