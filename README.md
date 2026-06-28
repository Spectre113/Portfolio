# Portfolio

Персональный сайт-портфолио frontend-разработчика [Владимира Топоркова](https://github.com/Spectre113).

**Live:** [portfolio-delta-umber-48.vercel.app](https://portfolio-delta-umber-48.vercel.app/)  
**Репозиторий:** [github.com/Spectre113/Portfolio](https://github.com/Spectre113/Portfolio)

Проект сделан как полноценное React-приложение, а не статичная визитка: здесь есть страницы, проекты, навыки, контакты, интерактивные элементы и AI-помощник, который сопоставляет требования вакансии с реальными кейсами из портфолио.

## Возможности

- Многостраничное SPA с разделами: главная, проекты, обо мне и навыки
- Адаптивный интерфейс со светлой и тёмной темой
- Переключатель языка RU/EN с сохранением предпочтения в `localStorage`
- Каталог проектов с фильтрами, поиском, каруселью, подробными карточками, GitHub-ссылками и демо
- AI-помощник по портфолио через Vercel serverless endpoint и Groq API (rate limit, fallback при ошибках)
- SEO meta, Open Graph preview, sitemap, robots.txt и Vercel Analytics с кастомными событиями
- Интерактивный hero-блок в стиле редактора кода с typewriter-анимацией
- Контактная модалка с валидацией, форматированием телефона и отправкой через Formspree
- Данные проектов из GitHub API с локальным fallback
- Zod-валидация внешних данных и форм
- Поддержка `prefers-reduced-motion` для анимированных секций
- Скачивание резюме в PDF

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

## Запуск

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`.

Для локальной работы AI-помощника используйте [Vercel CLI](https://vercel.com/docs/cli):

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

`GROQ_API_KEY` должен оставаться только на серверной стороне. Не добавляйте к нему префикс `VITE_`.

## Скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | Запуск dev-сервера Vite |
| `npm run build` | Сборка production-версии |
| `npm run preview` | Локальный preview production-сборки |
| `npm run lint` | Запуск ESLint |
| `npm run test` | Запуск тестов Vitest |

## Структура проекта

Архитектура вдохновлена Feature-Sliced Design:

- `src/app` - провайдеры и маршрутизация
- `src/pages` - страницы маршрутов
- `src/widgets` - секции страниц и виджеты (hero, проекты, AI-ассистент, контакты)
- `src/entities` - модель данных проектов, API и hooks
- `src/shared` - общий UI, тема, язык, аналитика
- `api` - Vercel serverless functions (`/api/assistant`)
- `public` - статические файлы, резюме, sitemap, robots.txt

## Деплой

### Vercel (production)

Сайт развёрнут на Vercel: [https://vtoporkov.vercel.app/](https://vtoporkov.vercel.app/).

При пуше в `main` Vercel автоматически собирает и публикует проект. Preset сборки - **Vite**. SPA-роутинг настроен через `vercel.json`.

Production-переменные в Vercel Dashboard:

| Переменная | Обязательна | Описание |
| --- | --- | --- |
| `VITE_FORMSPREE_ENDPOINT` | да | Endpoint Formspree для контактной формы |
| `GROQ_API_KEY` | да | API-ключ Groq для AI-помощника |
| `GROQ_MODEL` | нет | Модель Groq (по умолчанию `llama-3.1-8b-instant`) |

### GitHub Pages (альтернатива)

В репозитории есть workflow `.github/workflows/pages.yml` для деплоя на GitHub Pages. При сборке устанавливается `GITHUB_PAGES=true`, base path - `/Portfolio/`.

Для GitHub Pages AI-помощник недоступен: serverless endpoint работает только на Vercel.

## О проекте

Портфолио показывает практический frontend-подход: поддерживаемую компонентную архитектуру, типизированные контракты данных, интеграцию с API, предсказуемые UI-состояния, адаптивную вёрстку и небольшие интерактивные детали, которые делают сайт живым.
