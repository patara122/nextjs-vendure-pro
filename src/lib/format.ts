import {toIntlLocale} from '@/i18n/locale-utils';

type DateFormat = 'short' | 'long';

/**
 * Format a date string
 * @param dateString ISO date string
 * @param format 'short' (Jan 15, 2024) or 'long' (January 15, 2024)
 * @param locale App locale code (e.g. 'th', 'en')
 */
export function formatDate(dateString: string, format: DateFormat = 'short', locale: string = 'th'): string {
    const options: Intl.DateTimeFormatOptions = format === 'long'
        ? { year: 'numeric', month: 'long', day: 'numeric' }
        : { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString(toIntlLocale(locale), options);
}
