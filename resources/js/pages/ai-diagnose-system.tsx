import { Head } from '@inertiajs/react';
import { ExternalLink, Brain } from 'lucide-react';
import PublicPageNav from '@/components/public-page-nav';

export default function AiDiagnoseSystem() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
            <Head title="AI Diagnose System - Zen AI" />

            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100">
                        <div className="w-16 h-16 bg-cyan-100 text-cyan-700 rounded-2xl flex items-center justify-center mb-8">
                            <Brain className="w-8 h-8" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">AI Diagnose System</h1>

                        <p className="text-xl text-stone-600 mb-10 leading-relaxed">
                            Our advanced AI algorithms provide precise and early diagnosis based on TCM principles, visualizing complex health data for better decision making.
                        </p>

                        <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl border border-stone-200">
                            <img
                                src="/images/dashboard.jpg"
                                alt="AI Diagnosis Dashboard"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">Powered by Jianpei</h2>
                            <p className="text-stone-600 mb-6">
                                Discover the technology behind our AI diagnostic systems.
                            </p>
                            <a
                                href="http://www.jianpeicn.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-full font-semibold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20"
                            >
                                Visit Jianpei
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
