import {routing, type Locale} from './routing';

const OG_LOCALE_MAP: Record<Locale, string> = { en: 'en_US', th: 'th_TH' };
const INTL_LOCALE_MAP: Record<Locale, string> = { en: 'en-US', th: 'th-TH' };

export function toOgLocale(locale: string): string {
    return OG_LOCALE_MAP[locale as Locale] || 'en_US';
}

export function toIntlLocale(locale: string): string {
    return INTL_LOCALE_MAP[locale as Locale] || 'en-US';
}
