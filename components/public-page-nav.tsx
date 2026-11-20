import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PublicPageNav({ logoSrc = '/zen-ai-logo.png' }: { logoSrc?: string }) {
    return (
        <nav className="fixed z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img src={logoSrc} alt="Zen AI" className="h-10 w-auto" />
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-stone-600 transition-colors hover:text-emerald-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
