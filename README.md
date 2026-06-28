# Portfolio

Персональный сайт-портфолио frontend-разработчика. Проект сделан как полноценное React-приложение, а не статичная визитка: здесь есть страницы, проекты, навыки, контакты, интерактивные элементы и AI-помощник, который сопоставляет требования вакансии с реальными кейсами из портфолио.

## Возможности

- Многостраничное SPA с разделами: главная, проекты, обо мне и навыки
- Адаптивный интерфейс со светлой и темной темой
- Каталог проектов с фильтрами, поиском, подробными карточками, GitHub-ссылками и демо
- AI-помощник по портфолио через Vercel serverless endpoint и Groq API
- Интерактивный hero-блок в стиле редактора кода
- Контактная модалка с валидацией, форматированием телефона и отправкой через Formspree
- Данные проектов из GitHub API с локальным fallback
- Zod-валидация внешних данных и форм
- Поддержка reduced motion для анимированных секций

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
- Vercel Functions
- Groq API
- Formspree

## Запуск

```bash
npm install
npm run dev
```

## Переменные окружения

Для локальной разработки создайте `.env.local`:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.1-8b-instant
```

`GROQ_API_KEY` должен оставаться только на серверной стороне. Не добавляйте к нему префикс `VITE_`.

## Скрипты

- `npm run dev` - запуск dev-сервера
- `npm run build` - сборка production-версии
- `npm run preview` - локальный preview production-сборки
- `npm run lint` - запуск ESLint

## Структура проекта

- `src/pages` - страницы маршрутов
- `src/widgets` - секции страниц и виджеты
- `src/entities` - модель данных проектов, API и hooks
- `src/shared` - общий UI и логика темы
- `api` - Vercel serverless functions
- `public` - статические файлы и резюме

## Деплой

Проект готов к деплою на Vercel с preset `Vite`.

Обязательные production-переменные:

- `VITE_FORMSPREE_ENDPOINT`
- `GROQ_API_KEY`

Опционально:

- `GROQ_MODEL`

## О проекте

Портфолио показывает практический frontend-подход: поддерживаемую компонентную архитектуру, типизированные контракты данных, интеграцию с API, предсказуемые UI-состояния, адаптивную верстку и небольшие интерактивные детали, которые делают сайт живым.
