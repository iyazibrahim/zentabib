import PublicPageNav from '@/components/public-page-nav';
import { Activity, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ZenLive',
};

export default function ZenLivePage() {
    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-stone-100 bg-white p-8 text-center shadow-xl md:p-12">
                        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-100 text-teal-700">
                            <Activity className="h-10 w-10" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold text-stone-900 md:text-5xl">
                            ZenLive
                        </h1>

                        <div className="mx-auto max-w-2xl">
                            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 font-medium text-amber-800">
                                <Clock className="h-4 w-4" />
                                Coming Soon
                            </div>

                            <p className="mb-4 text-2xl font-medium text-stone-700">
                                Under Collaboration with
                            </p>
                            <h2 className="mb-8 text-3xl font-bold text-emerald-800">
                                Universiti Malaysia Sabah (UMS)
                            </h2>

                            <p className="text-lg leading-relaxed text-stone-600">
                                We are currently working on establishing ZenLive to bring you
                                holistic patient care combining TCM practices with contemporary
                                clinical standards. Stay tuned for updates.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
