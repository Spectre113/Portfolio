# Portfolio

[Русская версия](README.md)

Personal portfolio website for frontend developer Vladimir Toporkov. It is built as a full React application, not a static business card: routing, project pages, about and skills sections, contact form, event analytics, bilingual UI and an AI assistant for quick vacancy analysis.

**Live:** [https://vtoporkov.vercel.app/](https://vtoporkov.vercel.app/)

**Repository:** [github.com/Spectre113/Portfolio](https://github.com/Spectre113/Portfolio)

## About

This portfolio shows my practical frontend approach: component architecture, typed data contracts, API integration, predictable UI states, responsive layout, accessible interactive elements and attention to how the site behaves in real user scenarios.

The home page quickly answers the key recruiter questions: who I am, what I do, which projects are worth checking, where to download the CV and how to contact me. Separate pages describe projects, experience, skills and workflow in more detail.

## Features

- Multi-page SPA: home, projects, about, skills
- RU/EN interface with browser language detection and `localStorage` preference
- Light and dark themes with saved user preference
- Responsive header with mobile menu, language/theme toggles and AI button
- Hero section with an interactive code card and typewriter animation
- Project catalog with search, filters, detailed cards, GitHub links and demos
- Home project carousel built with Embla Carousel and `prefers-reduced-motion` support
- Skills page with runtime-style visual animation and grouped skill areas
- About page with expandable details, profile card, timeline and AI workflow block
- Contact modal with validation, phone formatting and Formspree submission
- Portfolio AI assistant through a Vercel serverless endpoint and Groq API
- Local AI fallback when the model is temporarily unavailable
- Rate limiting and basic protection for the serverless endpoint
- Project data from GitHub API with local fallback
- SEO meta tags, canonical URL, Open Graph image, `sitemap.xml`, `robots.txt`
- Vercel Analytics and custom events for key actions
- Lazy-loaded pages with `React.lazy` and `Suspense`
- PDF CV download
- Unit tests for project search and contact form helpers

## AI Assistant

The AI assistant helps visitors quickly understand which skills and projects fit a vacancy or a specific request. It can:

- analyze a vacancy description;
- suggest which projects to show HR;
- summarize my experience;
- explain the project stack;
- answer in Russian or English depending on the selected interface language.

The client does not store the API key. Requests go to `/api/assistant`, and the serverless function calls Groq API. If the key is missing, rate limit is exceeded or the model is unavailable, the UI shows a local fallback response.

## Stack

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

## Architecture

The project structure is close to Feature-Sliced Design:

- `src/app` - providers and routing
- `src/pages` - route pages
- `src/widgets` - large UI sections and widgets
- `src/entities` - project model, API and hooks
- `src/shared` - shared utilities, UI, theme, language and analytics
- `api` - Vercel serverless functions
- `public` - static files, CV, favicon, sitemap, robots.txt, OG image

## Local Setup

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

To check the production build:

```bash
npm run build
npm run preview
```

To run the serverless endpoint locally, use Vercel CLI:

```bash
npx vercel dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=llama-3.1-8b-instant
```

`VITE_FORMSPREE_ENDPOINT` is available on the client and is used by the contact form.

`GROQ_API_KEY` must stay server-side only. Do not add the `VITE_` prefix to it.

`GROQ_MODEL` is optional. If it is not set, `llama-3.1-8b-instant` is used.

## Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start Vite dev server                     |
| `npm run build`   | Run TypeScript check and production build |
| `npm run preview` | Preview production build locally          |
| `npm run lint`    | Run ESLint                                |
| `npm run test`    | Run Vitest tests                          |

## Deployment

The project is intended for Vercel deployment.

Settings:

- Framework Preset - `Vite`
- Build Command - `npm run build`
- Output Directory - `dist`
- Install Command - default npm install command
- SPA routing is configured through `vercel.json`

Production variables in Vercel Dashboard:

| Variable                  | Required | Description                         |
| ------------------------- | -------- | ----------------------------------- |
| `VITE_FORMSPREE_ENDPOINT` | yes      | Formspree endpoint for contact form |
| `GROQ_API_KEY`            | yes      | Groq API key for AI assistant       |
| `GROQ_MODEL`              | no       | Groq model                          |

## SEO and Analytics

The project includes:

- basic meta tags in `index.html`;
- canonical URL;
- Open Graph and Twitter preview through `public/og-image.svg`;
- `public/sitemap.xml`;
- `public/robots.txt`;
- Vercel Analytics;
- custom events for contact modal, AI assistant, demo links, GitHub links and CV download.

## Tests

Tests cover:

- project search and filtering;
- contact form helper functions;
- contact validation through email or phone.

Run tests:

```bash
npm run test
```

## Performance

Pages are lazy-loaded with `React.lazy` and `Suspense`, so `projects`, `about` and `skills` code does not fully land in the initial bundle. Project images in cards use `loading="lazy"`.

Further optimization can include compressing heavy project screenshots and moving large interactive widgets into separate lazy chunks.
