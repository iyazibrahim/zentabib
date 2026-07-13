import PublicPageNav from '@/components/public-page-nav';
import { ExternalLink, Stethoscope } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Medical Devices',
};

export default function MedicalDevicesPage() {
    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl border border-stone-100 bg-white p-8 shadow-xl md:p-12">
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <Stethoscope className="h-8 w-8" />
                        </div>

                        <h1 className="mb-6 text-4xl font-bold text-stone-900 md:text-5xl">
                            Medical Devices
                        </h1>

                        <p className="mb-10 text-xl leading-relaxed text-stone-600">
                            We provide state-of-the-art medical equipment that bridges traditional
                            wisdom with modern technology. Our devices are designed to enhance
                            diagnostic accuracy and treatment efficacy.
                        </p>

                        <div className="mb-10 rounded-2xl border border-stone-100 bg-stone-50 p-8">
                            <h2 className="mb-4 text-2xl font-bold text-stone-900">
                                Our Principal Partner
                            </h2>
                            <p className="mb-6 text-stone-600">
                                In collaboration with Xima Life, we bring you world-class medical
                                technologies.
                            </p>
                            <a
                                href="http://www.ximalife.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                            >
                                Visit Xima Life
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
