import {routing, type Locale} from './routing';

const OG_LOCALE_MAP: Record<Locale, string> = { th: 'th_TH', en: 'en_US' };
const INTL_LOCALE_MAP: Record<Locale, string> = { th: 'th-TH', en: 'en-US' };

export function toOgLocale(locale: string): string {
    return OG_LOCALE_MAP[locale as Locale] || 'th_TH';
}

export function toIntlLocale(locale: string): string {
    return INTL_LOCALE_MAP[locale as Locale] || 'th-TH';
}
