import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Send, X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
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

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState('');
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');
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
      }
    };

    document.body.classList.add('body--modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('body--modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) {
    return null;
  };

  const onSubmit: SubmitHandler<ContactFormValues> = async (values) => {
    setFormStatus(null);

    if (!FORMSPREE_ENDPOINT) {
      setSubmissionState('error');
      setFormStatus('Форма готова, но endpoint Formspree ещё не добавлен.');
      return;
    }

    setSubmissionState('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        body: JSON.stringify({
          ...values,
          _subject: `Сообщение с портфолио от ${values.name}`,
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
      setFormStatus('Сообщение отправлено. Спасибо, я скоро отвечу.');
    } catch {
      setSubmissionState('error');
      setFormStatus('Не удалось отправить сообщение. Попробуйте позже или напишите в Telegram.');
    }
  };

  return (
    <div className="contact-modal" role="presentation" onMouseDown={handleClose}>
      <section
        className="contact-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="contact-modal__close btn-reset"
          type="button"
          aria-label="Закрыть модальное окно"
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
          <div className="contact-modal__heading">
            <h2 id="contact-modal-title">Сообщение</h2>
            <p>Расскажите о проекте или задайте вопрос</p>
          </div>

          <form className="contact-modal__form" onSubmit={handleSubmit(onSubmit)}>
            <label
              className={`contact-modal__field${
                errors.name ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>Ваше имя</span>
              <input
                type="text"
                placeholder="Ваше имя *"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              <small className="contact-modal__error">
                {errors.name?.message}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.email ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register('email')}
              />
              <small className="contact-modal__error">
                {errors.email?.message}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.phone ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>Телефон</span>
              <input type="hidden" {...register('phone')} />
              <input
                type="tel"
                inputMode="tel"
                placeholder="+7 (999) 999-99-99"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
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
              <small className="contact-modal__error">
                {errors.phone?.message}
              </small>
            </label>

            <label
              className={`contact-modal__field${
                errors.message ? ' contact-modal__field--invalid' : ''
              }`}
            >
              <span>Сообщение</span>
              <textarea
                placeholder="Ваше сообщение *"
                rows={7}
                aria-invalid={Boolean(errors.message)}
                {...register('message')}
              />
              <small className="contact-modal__error">
                {errors.message?.message}
              </small>
            </label>

            <button
              className="contact-modal__submit"
              type="submit"
              disabled={submissionState === 'submitting'}
            >
              <Send size={20} strokeWidth={2} aria-hidden="true" />
              {submissionState === 'submitting'
                ? 'Отправляю...'
                : 'Отправить сообщение'}
            </button>

            <p
              className={`contact-modal__form-status contact-modal__form-status--${submissionState}`}
              aria-live="polite"
            >
              {formStatus}
            </p>
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
