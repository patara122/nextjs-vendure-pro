import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import {getRouteLocale} from '@/i18n/server';
import { ForgotPasswordForm } from './forgot-password-form';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRouteLocale();
    const t = await getTranslations({locale, namespace: 'Auth'});
    return {
        title: t('forgotPasswordPageTitle'),
    };
}

export default async function ForgotPasswordPage() {
    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}
