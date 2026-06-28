import { useCallback, useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Send, X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { trackPortfolioEvent } from '../../shared/analytics/trackEvent.ts';
import { useTranslation } from '../../shared/i18n/useTranslation.ts';
import type { Language } from '../../shared/language/language-context.ts';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import {
  contactFormSchema,
  formatPhone,
  type ContactFormValues,
} from './contact-form.ts';
import './ContactModal.css';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const contactModalCopy = {
  ru: {
    asideText:
      'Есть проект, идея или вопрос? Напишите, отвечу как только увижу ваше сообщение.',
    asideTitle: 'Напишите мне',
    asideTitleAccent: 'я на связи!',
    close: 'Закрыть модальное окно',
    email: 'Email',
    heading: 'Сообщение',
    message: 'Сообщение',
    messagePlaceholder: 'Ваше сообщение *',
    name: 'Ваше имя',
    namePlaceholder: 'Ваше имя *',
    notice: 'Никаких спам-рассылок. Только личное общение.',
    phone: 'Телефон',
    phonePlaceholder: '+7 (999) 999-99-99',
    statusEndpoint:
      'Форма готова, но endpoint Formspree ещё не добавлен.',
    statusError:
      'Не удалось отправить сообщение. Попробуйте позже или напишите в Telegram.',
    statusSuccess: 'Сообщение отправлено. Спасибо, я скоро отвечу.',
    subject: 'Сообщение с портфолио от',
    submit: 'Отправить сообщение',
    submitting: 'Отправляю...',
    subtitle: 'Расскажите о проекте или задайте вопрос',
  },
  en: {
    asideText:
      'Have a project, idea or question? Send a message, and I will reply as soon as I see it.',
    asideTitle: 'Message me',
    asideTitleAccent: 'I am available',
    close: 'Close contact dialog',
    email: 'Email',
    heading: 'Message',
    message: 'Message',
    messagePlaceholder: 'Your message *',
    name: 'Your name',
    namePlaceholder: 'Your name *',
    notice: 'No spam or mailing lists. Just direct communication.',
    phone: 'Phone',
    phonePlaceholder: '+7 (999) 999-99-99',
    statusEndpoint:
      'The form is ready, but the Formspree endpoint is not added yet.',
    statusError:
      'Could not send the message. Please try again later or text me on Telegram.',
    statusSuccess: 'Message sent. Thank you, I will reply soon.',
    subject: 'Portfolio message from',
    submit: 'Send message',
    submitting: 'Sending...',
    subtitle: 'Tell me about a project or ask a question',
  },
} satisfies Record<Language, Record<string, string>>;

const contactErrorCopy: Record<Language, Record<string, string>> = {
  ru: {
    'Сообщение должно быть не короче 10 символов':
      'Сообщение должно быть не короче 10 символов',
    'Укажите email или телефон, чтобы я мог ответить':
      'Укажите email или телефон, чтобы я мог ответить',
    'Укажите корректный email': 'Укажите корректный email',
    'Укажите имя': 'Укажите имя',
    'Укажите телефон полностью': 'Укажите телефон полностью',
  },
  en: {
    'Сообщение должно быть не короче 10 символов':
      'Message must be at least 10 characters long',
    'Укажите email или телефон, чтобы я мог ответить':
      'Add an email or phone number so I can reply',
    'Укажите корректный email': 'Enter a valid email',
    'Укажите имя': 'Enter your name',
    'Укажите телефон полностью': 'Enter the full phone number',
  },
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { language } = useTranslation();
  const copy = contactModalCopy[language];
  const errorCopy = contactErrorCopy[language];
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
  const dialogRef = useRef<HTMLElement>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    defaultValues: {
      email: '',
      message: '',
      name: '',
      phone: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(contactFormSchema),
  });
  const { ref: nameFieldRef, ...nameFieldProps } = register('name');

  const handleClose = useCallback(() => {
    reset();
    setPhoneInput('');
    setFormStatus(null);
    setSubmissionState('idle');
    onClose();
  }, [onClose, reset]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([type="hidden"]), select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    previouslyFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    document.body.classList.add('body--modal-open');
    window.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 0);

    return () => {
      document.body.classList.remove('body--modal-open');
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedElementRef.current?.focus();
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    setFormStatus(null);

    if (!FORMSPREE_ENDPOINT) {
      setSubmissionState('error');
      setFormStatus(copy.statusEndpoint);
      return;
    }

    setSubmissionState('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        body: JSON.stringify({
          ...values,
          _subject: `${copy.subject} ${values.name}`,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Formspree request failed');
      }

      reset();
      setPhoneInput('');
      setSubmissionState('success');
      setFormStatus(copy.statusSuccess);
      trackPortfolioEvent('contact_form_submit');
    } catch {
      setSubmissionState('error');
      setFormStatus(copy.statusError);
    }
  };

  const getErrorMessage = (message?: string) =>
    message ? (errorCopy[message] ?? message) : '';

  return (
    <div className="contact-modal" role="presentation" onMouseDown={handleClose}>
      <section
        ref={dialogRef}
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="contact-modal__close btn-reset"
          type="button"
          aria-label={copy.close}
          onClick={handleClose}
        >
          <X size={24} strokeWidth={2} aria-hidden="true" />
        </button>

        <aside className="contact-modal__aside">
          <span className="contact-modal__logo" aria-hidden="true">
            &lt;/&gt;
          </span>

          <div className="contact-modal__intro">
            <h2 className="contact-modal__aside-title">
              {copy.asideTitle} <span>{copy.asideTitleAccent}</span>
            </h2>
            <p>{copy.asideText}</p>
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
          <div className="contact-modal__heading">
            <h2 id="contact-modal-title">{copy.heading}</h2>
            <p>{copy.subtitle}</p>
          </div>

          <form className="contact-modal__form" onSubmit={handleSubmit(onSubmit)}>
            <label
              className={`contact-modal__field${
                errors.name ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>{copy.name}</span>
              <input
                type="text"
                placeholder={copy.namePlaceholder}
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                {...nameFieldProps}
                ref={(element) => {
                  nameFieldRef(element);
                  nameInputRef.current = element;
                }}
              />
              <small className="contact-modal__error" id="contact-name-error">
                {getErrorMessage(errors.name?.message)}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.email ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>{copy.email}</span>
              <input
                type="email"
                placeholder={copy.email}
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                {...register('email')}
              />
              <small className="contact-modal__error" id="contact-email-error">
                {getErrorMessage(errors.email?.message)}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.phone ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>{copy.phone}</span>
              <input type="hidden" {...register('phone')} />
              <input
                type="tel"
                inputMode="tel"
                placeholder={copy.phonePlaceholder}
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                value={phoneInput}
                onChange={(event) => {
                  const nextPhoneValue = formatPhone(event.target.value);

                  setPhoneInput(nextPhoneValue);
                  setValue('phone', nextPhoneValue, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
              />
              <small className="contact-modal__error" id="contact-phone-error">
                {getErrorMessage(errors.phone?.message)}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.message ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>{copy.message}</span>
              <textarea
                placeholder={copy.messagePlaceholder}
                rows={7}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? 'contact-message-error' : undefined
                }
                {...register('message')}
              />
              <small
                className="contact-modal__error"
                id="contact-message-error"
              >
                {getErrorMessage(errors.message?.message)}
              </small>
            </label>

            <button
              className="contact-modal__submit"
              type="submit"
              disabled={submissionState === 'submitting'}
            >
              <Send size={20} strokeWidth={2} aria-hidden="true" />
              {submissionState === 'submitting'
                ? copy.submitting
                : copy.submit}
            </button>

            <p
              className={`contact-modal__form-status contact-modal__form-status--${submissionState}`}
              aria-live="polite"
              role={submissionState === 'error' ? 'alert' : 'status'}
            >
              {formStatus}
            </p>
          </form>

          <p className="contact-modal__notice">
            <Lock size={14} strokeWidth={2.2} aria-hidden="true" />
            {copy.notice}
          </p>
        </div>
      </section>
    </div>
  );
}
