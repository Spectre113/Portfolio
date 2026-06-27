import { z } from 'zod';

type VercelRequest = {
  body?: unknown;
  method?: string;
};

type VercelResponse = {
  end: () => void;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  status: (code: number) => VercelResponse;
};

const GROQ_MODEL = process.env.GROQ_MODEL ?? 'llama-3.1-8b-instant';
const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_INPUT_LENGTH = 4000;

const AssistantRequestSchema = z.object({
  input: z.string().trim().min(1).max(MAX_INPUT_LENGTH),
});

const AssistantResponseSchema = z.object({
  title: z.string().trim().min(1).max(80),
  summary: z.string().trim().min(1).max(700),
  bullets: z.array(z.string().trim().min(1).max(240)).min(2).max(4),
  projects: z.array(z.string().trim().min(1).max(260)).min(1).max(4),
});

type AssistantResponse = z.infer<typeof AssistantResponseSchema>;

const portfolioContext = `
Владелец портфолио: Владимир Топорков, frontend-разработчик.
Фокус: React, TypeScript, SPA, REST API, TanStack Query, Zod, React Hook Form, React Router, адаптивная верстка, темы, UX-состояния, поддерживаемая архитектура.

Проекты:
1. VK Маруся: SPA для поиска фильмов, жанров и личного кабинета. Есть авторизация, защищенные сценарии, REST API, TanStack Query, Zod, loading/error-состояния, избранное.
2. Portfolio: персональный сайт на React/TypeScript/Vite. Есть маршруты, темы, анимации, contact form, data layer, Zod-контракты, GitHub API fallback.
3. Avito Task: личный кабинет продавца. Есть формы, фильтры, сортировка, пагинация, редактирование, React Hook Form, Zod, TanStack Query, AI-рекомендации через API. Backend не его зона.
4. VK Test: карточки с котиками, избранное на клиенте, infinite scroll, внешний API, адаптивный интерфейс.
5. W-Wave: статический сайт радиостанции, HTML/CSS/JavaScript, БЭМ, адаптив, формы и интерактивность.
6. TravelForge: frontend-участие в приложении планирования поездок: бюджет, предпочтения, карта, REST API, TravelBot UI. Backend и инфраструктура не его зона.

Честные зоны роста: тестирование, accessibility, производительность на сложных сценариях, production-процессы в команде.
`;

const systemInstruction = `
Ты AI-помощник на сайте портфолио Владимира. Отвечай рекрутеру или посетителю сайта.
Твоя задача: сопоставить вопрос или текст вакансии с реальными навыками и проектами из контекста.

Правила:
- Не выдумывай коммерческий опыт, технологии или достижения.
- Если требование не подтверждено контекстом, мягко обозначь это как зону роста.
- Пиши по-русски, коротко и уверенно.
- Верни только JSON без markdown.
- JSON должен иметь поля: title, summary, bullets, projects.
- bullets: 2-4 пункта.
- projects: 1-4 строки с лучшими проектами и причиной выбора.

Контекст портфолио:
${portfolioContext}
`;

function parseRequestBody(body: unknown) {
  if (typeof body === 'string') {
    return JSON.parse(body);
  }

  return body;
}

function parseGroqText(data: unknown) {
  const response = z
    .object({
      choices: z
        .array(
          z.object({
            message: z.object({
              content: z.string(),
            }),
          }),
        )
        .min(1),
    })
    .parse(data);

  return response.choices[0].message.content.trim();
}

async function requestAssistantResponse(input: string): Promise<AssistantResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const response = await fetch(GROQ_ENDPOINT, {
    body: JSON.stringify({
      max_completion_tokens: 700,
      messages: [
        {
          role: 'system',
          content: systemInstruction,
        },
        {
          role: 'user',
          content: `Вопрос или описание вакансии:\n${input}`,
        },
      ],
      model: GROQ_MODEL,
      response_format: { type: 'json_object' },
      temperature: 0.35,
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error(`Groq request failed: ${response.status}`);
  }

  const data: unknown = await response.json();
  const text = parseGroqText(data);
  const parsedJson: unknown = JSON.parse(text);

  return AssistantResponseSchema.parse(parsedJson);
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const body = parseRequestBody(request.body);
    const { input } = AssistantRequestSchema.parse(body);
    const assistantResponse = await requestAssistantResponse(input);

    response.status(200).json(assistantResponse);
  } catch (error) {
    console.error(error);

    response.status(500).json({
      message: 'Assistant is temporarily unavailable',
    });
  }
}
