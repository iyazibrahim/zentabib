import { ArrowLeft } from 'lucide-react';

export default function PublicPageNav() {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <a href="/" className="flex items-center">
                        <img src="/zen-ai-logo.png" alt="Zen AI" className="h-10 w-auto" />
                    </a>
                    <a href="/" className="flex items-center gap-2 text-stone-600 hover:text-emerald-600 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
