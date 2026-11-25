import PublicPageNav from '@/components/public-page-nav';
import SectionBackdrop from '@/components/section-backdrop';
import { ATMOSPHERES } from '@/lib/atmospheres';
import { getServiceBySlug, getSiteContent } from '@/lib/content/store';
import { ServiceIcon, serviceIconColors } from '@/lib/service-icons';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);
    if (!service) {
        return { title: 'Service Not Found' };
    }

    return {
        title: service.title,
        description: service.summary,
    };
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const [service, content] = await Promise.all([getServiceBySlug(slug), getSiteContent()]);

    if (!service) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-800">
            <PublicPageNav logoSrc={content.brand?.logoSrc ?? '/zen-ai-logo.png'} />

            <div className="relative overflow-hidden bg-[#04101f] pt-28 pb-10">
                <SectionBackdrop
                    src={ATMOSPHERES.servicePage}
                    overlayClassName="bg-[#04101f]/75"
                />
                <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white md:text-5xl">{service.title}</h1>
                    {service.tagline ? (
                        <p className="mt-3 text-lg text-emerald-200">{service.tagline}</p>
                    ) : null}
                </div>
            </div>

            <main className="pb-20">
                <div className="mx-auto -mt-6 max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg">
                        {service.imageSrc ? (
                            <img
                                src={service.imageSrc}
                                alt={service.title}
                                className="h-56 w-full object-cover md:h-72"
                            />
                        ) : (
                            <div
                                className={`flex h-40 items-center justify-center md:h-48 ${serviceIconColors[service.icon]}`}
                            >
                                <ServiceIcon icon={service.icon} className="h-10 w-10" />
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            <p className="mb-8 text-xl leading-relaxed text-stone-600">
                                {service.summary}
                            </p>

                            <p className="mb-10 text-lg leading-relaxed text-stone-600">
                                {service.description}
                            </p>

                            <div className="mb-10 space-y-4">
                                {service.bullets.map((bullet) => (
                                    <div
                                        key={bullet.label}
                                        className="rounded-2xl border border-stone-100 bg-stone-50 p-5"
                                    >
                                        <h2 className="mb-2 text-lg font-semibold text-emerald-700">
                                            {bullet.label}
                                        </h2>
                                        <p className="text-stone-600">{bullet.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/#services"
                                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                                >
                                    Back to services
                                </Link>
                                <a
                                    href={content.contact.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 font-semibold text-stone-700 transition-colors hover:bg-stone-50"
                                >
                                    Contact on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
