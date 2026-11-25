import { ATMOSPHERES } from '@/lib/atmospheres';
import Link from 'next/link';

export default function PublicPageNav({ logoSrc = ATMOSPHERES.seal }: { logoSrc?: string }) {
    return (
        <nav className="fixed z-50 w-full border-b border-white/10 bg-[#06101f]/85 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <img
                            src={logoSrc === '/zen-ai-logo.png' ? ATMOSPHERES.seal : logoSrc}
                            alt="Zen AI Healthcare"
                            className="h-11 w-11 rounded-full bg-white object-contain p-1"
                        />
                        <span className="sr-only">Zen AI Healthcare</span>
                    </Link>
                    <Link
                        href="/"
                        className="font-medium text-slate-200 transition-colors hover:text-white"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
}
