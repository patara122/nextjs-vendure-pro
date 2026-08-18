import type {Metadata} from 'next';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { ResetPasswordForm } from './reset-password-form';

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
    title: 'Reset Password',
    description: 'Create a new password for your account.',
};

export default function ResetPasswordPage({searchParams}: PageProps<'/[locale]/reset-password'>) {
    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-md mx-auto">
                <Suspense fallback={
                    <div className="flex justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                }>
                    <ResetPasswordForm searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}
