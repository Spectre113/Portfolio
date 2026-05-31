import { useCallback, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Mail, Send, X } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { GitHubIcon } from '../../shared/ui/BrandIcon/BrandIcon.tsx';
import './ContactModal.css';

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const contactFormSchema = z
  .object({
    email: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || z.email().safeParse(value).success,
        'Укажите корректный email',
      ),
    message: z
      .string()
      .trim()
      .min(10, 'Сообщение должно быть не короче 10 символов'),
    name: z.string().trim().min(2, 'Укажите имя'),
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || getPhoneDigits(value).length === 11,
        'Укажите телефон полностью',
      ),
  })
  .superRefine(({ email, phone }, context) => {
    if (email || getPhoneDigits(phone).length === 11) {
      return;
    }

    const message = 'Укажите email или телефон, чтобы я мог ответить';

    context.addIssue({
      code: 'custom',
      message,
      path: ['email'],
    });
    context.addIssue({
      code: 'custom',
      message,
      path: ['phone'],
    });
  });

type ContactFormValues = z.infer<typeof contactFormSchema>;

function getPhoneDigits(value = '') {
  return value.replace(/\D/g, '');
}

function formatPhone(value: string) {
  const digits = getPhoneDigits(value);

  if (!digits) {
    return '';
  }

  const localDigits = digits.replace(/^[78]/, '').slice(0, 10);
  const parts = [
    localDigits.slice(0, 3),
    localDigits.slice(3, 6),
    localDigits.slice(6, 8),
    localDigits.slice(8, 10),
  ];

  let formattedValue = '+7';

  if (parts[0]) {
    formattedValue += ` (${parts[0]}`;
  }

  if (parts[0]?.length === 3) {
    formattedValue += ')';
  }

  if (parts[1]) {
    formattedValue += ` ${parts[1]}`;
  }

  if (parts[2]) {
    formattedValue += `-${parts[2]}`;
  }

  if (parts[3]) {
    formattedValue += `-${parts[3]}`;
  }

  return formattedValue;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [phoneInput, setPhoneInput] = useState('');
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

  const onSubmit: SubmitHandler<ContactFormValues> = () => {
    setFormStatus('Форма проверена. Отправку подключим следующим шагом.');
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

            <button className="contact-modal__submit" type="submit">
              <Send size={20} strokeWidth={2} aria-hidden="true" />
              Отправить сообщение
            </button>

            {formStatus && (
              <p className="contact-modal__form-status">{formStatus}</p>
            )}
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
