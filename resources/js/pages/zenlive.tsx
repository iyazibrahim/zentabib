import { Head } from '@inertiajs/react';
import { Activity, Clock } from 'lucide-react';
import PublicPageNav from '@/components/public-page-nav';

export default function ZenLive() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
            <Head title="ZenLive - Zen AI" />

            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100 text-center">
                        <div className="w-20 h-20 bg-teal-100 text-teal-700 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Activity className="w-10 h-10" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">ZenLive</h1>

                        <div className="max-w-2xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full font-medium mb-8">
                                <Clock className="w-4 h-4" />
                                Coming Soon
                            </div>

                            <p className="text-2xl text-stone-700 font-medium mb-4">
                                Under Collaboration with
                            </p>
                            <h2 className="text-3xl font-bold text-emerald-800 mb-8">
                                Universiti Malaysia Sabah (UMS)
                            </h2>

                            <p className="text-lg text-stone-600 leading-relaxed">
                                We are currently working on establishing ZenLive to bring you holistic patient care combining TCM practices with contemporary clinical standards. Stay tuned for updates.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
