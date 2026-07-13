import PublicPageNav from '@/components/public-page-nav';
import { Brain, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'AI Diagnose System',
};

export default function AiDiagnoseSystemPage() {
    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl md:p-12">
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                            <Brain className="h-8 w-8" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold text-stone-900 md:text-5xl">
                            AI Diagnose System
                        </h1>

                        <p className="mb-10 text-xl leading-relaxed text-stone-600">
                            Our advanced AI algorithms provide precise and early diagnosis based on
                            TCM principles, visualizing complex health data for better decision
                            making.
                        </p>

                        <div className="mb-12 overflow-hidden rounded-2xl border border-stone-200 shadow-2xl">
                            <img
                                src="/images/dashboard.jpg"
                                alt="AI Diagnosis Dashboard"
                                className="h-auto w-full object-cover"
                            />
                        </div>

                        <div className="rounded-2xl border border-stone-100 bg-stone-50 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-stone-900">
                                Powered by Jianpei
                            </h2>
                            <p className="mb-6 text-stone-600">
                                Discover the technology behind our AI diagnostic systems.
                            </p>
                            <a
                                href="http://www.jianpeicn.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-700"
                            >
                                Visit Jianpei
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
