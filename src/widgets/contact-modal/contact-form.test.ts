import { describe, expect, it } from 'vitest';
import {
  contactFormSchema,
  formatPhone,
  getPhoneDigits,
} from './contact-form.ts';

describe('contact form helpers', () => {
  it('formats Russian phone numbers', () => {
    expect(formatPhone('89991234567')).toBe('+7 (999) 123-45-67');
    expect(getPhoneDigits('+7 (999) 123-45-67')).toBe('79991234567');
  });

  it('accepts a valid message with email', () => {
    const result = contactFormSchema.safeParse({
      email: 'user@example.com',
      message: 'Здравствуйте, хочу обсудить проект.',
      name: 'Анна',
      phone: '',
    });

    expect(result.success).toBe(true);
  });

  it('requires email or full phone number', () => {
    const result = contactFormSchema.safeParse({
      email: '',
      message: 'Здравствуйте, хочу обсудить проект.',
      name: 'Анна',
      phone: '',
    });

    expect(result.success).toBe(false);
  });
});
