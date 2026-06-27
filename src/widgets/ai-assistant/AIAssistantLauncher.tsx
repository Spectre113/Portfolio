import { Bot, CheckCircle2, Send, Sparkles, X } from 'lucide-react';
import './AIAssistantLauncher.css';

const quickPrompts = [
  'Подхожу ли я под вакансию?',
  'Какие проекты показать HR?',
  'Кратко о моем опыте',
];

export function AIAssistantLauncher({
  isOpen,
  onClose,
  onToggle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="ai-assistant">
      <button
        className="ai-assistant__trigger btn-reset"
        type="button"
        aria-expanded={isOpen}
        aria-controls="ai-assistant-panel"
        aria-label={isOpen ? 'Закрыть AI-помощника' : 'Открыть AI-помощника'}
        onClick={onToggle}
      >
        <Sparkles size={19} strokeWidth={2.2} aria-hidden="true" />
      </button>

      {isOpen && (
        <>
          <button
            className="ai-assistant__backdrop btn-reset"
            type="button"
            aria-label="Закрыть AI-помощника"
            onClick={onClose}
          />

          <section
            className="ai-assistant__panel ai-assistant__panel--open"
            id="ai-assistant-panel"
            aria-label="AI-помощник по портфолио"
          >
            <div className="ai-assistant__header">
              <span className="ai-assistant__icon" aria-hidden="true">
                <Bot size={22} strokeWidth={2.1} />
              </span>
              <div>
                <h2>AI-помощник</h2>
                <p>Черновик будущего ассистента по портфолио</p>
              </div>
              <button
                className="ai-assistant__close btn-reset"
                type="button"
                aria-label="Закрыть"
                onClick={onClose}
              >
                <X size={20} strokeWidth={2.1} aria-hidden="true" />
              </button>
            </div>

            <div className="ai-assistant__notice">
              <Sparkles size={18} strokeWidth={2.1} aria-hidden="true" />
              <p>
                Позже сюда подключим serverless-функцию. Ассистент сможет
                сопоставлять вакансию с моими навыками и проектами без
                выдумывания лишнего опыта.
              </p>
            </div>

            <div className="ai-assistant__result" aria-live="polite">
              <div className="ai-assistant__result-head">
                <CheckCircle2 size={18} strokeWidth={2.1} aria-hidden="true" />
                <span>Пример будущего ответа</span>
              </div>
              <p>
                Если вакансия связана с React, TypeScript, REST API, формами,
                Zod или server state, ассистент сможет быстро показать
                совпадения и подсказать, какие проекты лучше приложить.
              </p>
              <ul className="list-reset">
                <li>Marusya — SPA, авторизация, TanStack Query, Zod</li>
                <li>Avito Task — формы, AI-рекомендации, работа с API</li>
                <li>Portfolio — архитектура, темы, анимации, data layer</li>
              </ul>
            </div>

            <label className="ai-assistant__field">
              <span>Вопрос или описание вакансии</span>
              <textarea
                placeholder="Например: нужен React/TypeScript frontend junior с REST API, формами и базовым пониманием архитектуры."
                rows={5}
              />
            </label>

            <div className="ai-assistant__prompts">
              {quickPrompts.map((prompt) => (
                <button className="btn-reset" type="button" key={prompt}>
                  {prompt}
                </button>
              ))}
            </div>

            <button className="ai-assistant__submit btn-reset" type="button">
              <Send size={18} strokeWidth={2.1} aria-hidden="true" />
              Оценить совпадение
            </button>

            <p className="ai-assistant__status">
              Сейчас это UI-прототип. Реальный ответ подключим через serverless
              endpoint, чтобы не хранить ключи на клиенте.
            </p>
          </section>
        </>
      )}
    </div>
  );
}
