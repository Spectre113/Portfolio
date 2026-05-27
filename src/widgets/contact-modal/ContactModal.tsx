import { type FormEvent, useEffect } from 'react';
import { Lock, Mail, Send, X } from 'lucide-react';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import './ContactModal.css';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('body--modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('body--modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="contact-modal" role="presentation" onMouseDown={onClose}>
      <section
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <aside className="contact-modal__aside">
          <span className="contact-modal__logo" aria-hidden="true">
            &lt;/&gt;
          </span>

          <div className="contact-modal__intro">
            <h2 className="contact-modal__aside-title">
              Напишите мне <span>я на связи!</span>
            </h2>
            <p>
              Есть проект, идея или вопрос? Напишите, отвечу как только увижу
              ваше сообщение.
            </p>
          </div>

          <ul className="contact-modal__links list-reset">
            <li>
              <a href="https://t.me/Spectre113">
                <span className="contact-modal__link-icon" aria-hidden="true">
                  <Send size={21} strokeWidth={2} />
                </span>
                <span>
                  Telegram
                  <strong>@Spectre113</strong>
                </span>
              </a>
            </li>
            <li>
              <a href="mailto:VTvolody626@gmail.com">
                <span className="contact-modal__link-icon" aria-hidden="true">
                  <Mail size={21} strokeWidth={2} />
                </span>
                <span>
                  Email
                  <strong>VTvolody626@gmail.com</strong>
                </span>
              </a>
            </li>
            <li>
              <a href="https://github.com/Spectre113">
                <span className="contact-modal__link-icon" aria-hidden="true">
                  <GitHubIcon />
                </span>
                <span>
                  GitHub
                  <strong>github.com/Spectre113</strong>
                </span>
              </a>
            </li>
          </ul>
        </aside>

        <div className="contact-modal__content">
          <button
            className="contact-modal__close btn-reset"
            type="button"
            aria-label="Закрыть модальное окно"
            onClick={onClose}
          >
            <X size={24} strokeWidth={2} aria-hidden="true" />
          </button>

          <div className="contact-modal__heading">
            <h2 id="contact-modal-title">Сообщение</h2>
            <p>Расскажите о проекте или задайте вопрос</p>
          </div>

          <form className="contact-modal__form" onSubmit={handleSubmit}>
            <label className="contact-modal__field">
              <span>Ваше имя</span>
              <input type="text" name="name" placeholder="Ваше имя (необязательно)" />
            </label>

            <label className="contact-modal__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email (необязательно)"
                autoComplete="email"
              />
            </label>

            <label className="contact-modal__field">
              <span>Сообщение</span>
              <textarea name="message" placeholder="Ваше сообщение..." rows={7} />
            </label>

            <button className="contact-modal__submit" type="submit">
              <Send size={20} strokeWidth={2} aria-hidden="true" />
              Отправить сообщение
            </button>
          </form>

          <p className="contact-modal__notice">
            <Lock size={14} strokeWidth={2.2} aria-hidden="true" />
            Никаких спам-рассылок. Только личное общение.
          </p>
        </div>
      </section>
    </div>
  );
}
