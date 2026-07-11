import { Head } from '@inertiajs/react';
import { ExternalLink, Stethoscope } from 'lucide-react';
import PublicPageNav from '@/components/public-page-nav';

export default function MedicalDevices() {
    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
            <Head title="Medical Devices - Zen AI" />

            <PublicPageNav />

            <main className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-100">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-8">
                            <Stethoscope className="w-8 h-8" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">Medical Devices</h1>

                        <p className="text-xl text-stone-600 mb-10 leading-relaxed">
                            We provide state-of-the-art medical equipment that bridges traditional wisdom with modern technology. Our devices are designed to enhance diagnostic accuracy and treatment efficacy.
                        </p>

                        <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100 mb-10">
                            <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Principal Partner</h2>
                            <p className="text-stone-600 mb-6">
                                In collaboration with Xima Life, we bring you world-class medical technologies.
                            </p>
                            <a
                                href="http://www.ximalife.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                            >
                                Visit Xima Life
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
