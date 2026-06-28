import { z } from 'zod';

export function getPhoneDigits(value = '') {
  return value.replace(/\D/g, '');
}

export function formatPhone(value: string) {
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

export const contactFormSchema = z
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

export type ContactFormValues = z.infer<typeof contactFormSchema>;
