import en from '@/i18n/locale/en';
import es from '@/i18n/locale/es';
import { createI18n } from 'vue-i18n';

export type MessageSchema = typeof es;

export const i18n = createI18n<[MessageSchema], 'es' | 'en'>({
  legacy: false,
  locale: localStorage.getItem('locale') || 'es',
  fallbackLocale: 'es',
  globalInjection: true,
  messages: { es, en },
});
