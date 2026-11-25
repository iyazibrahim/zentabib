'use client';

import GalleryCarousel, { GalleryFilterButton } from '@/components/gallery-carousel';
import SectionBackdrop from '@/components/section-backdrop';
import { ATMOSPHERES } from '@/lib/atmospheres';
import type { SiteContent } from '@/lib/content/types';
import { ServiceIcon, serviceIconColors } from '@/lib/service-icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    CalendarDays,
    Lightbulb,
    Mail,
    MapPin,
    Menu,
    Phone,
    Sparkles,
    Wallet,
    Wifi,
    X,
    Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const philosophyIcons = {
    fast: Zap,
    anywhere: Wifi,
    affordable: Wallet,
    creative: Lightbulb,
} as const;

export default function WelcomePage({ content }: { content: SiteContent }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeAlbumId, setActiveAlbumId] = useState<string>('all');
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const sections = content.sections;
    const logoSrc = content.brand?.logoSrc || '/zen-ai-logo.png';

    const albums = useMemo(
        () => [...content.gallery.albums].sort((a, b) => a.order - b.order),
        [content.gallery.albums],
    );

    const galleryPhotos = useMemo(() => {
        const photos = albums.flatMap((album) =>
            album.photos
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((photo) => ({ ...photo, albumTitle: album.title, albumId: album.id })),
        );

        if (activeAlbumId === 'all') {
            return photos;
        }

        return photos.filter((photo) => photo.albumId === activeAlbumId);
    }, [activeAlbumId, albums]);

    const featuredEvent =
        content.events.find((event) => event.visible && event.featured) ??
        content.events.find((event) => event.visible) ??
        null;

    const navLinks = [
        sections.hero ? { href: '#home', label: 'Home' } : null,
        sections.services ? { href: '#services', label: 'Services' } : null,
        sections.about || sections.philosophy ? { href: '#about', label: 'About' } : null,
        sections.gallery ? { href: '#gallery', label: 'Gallery' } : null,
        sections.events ? { href: '#events', label: 'Events' } : null,
        sections.contact ? { href: '#contact', label: 'Contact' } : null,
    ].filter(Boolean) as { href: string; label: string }[];

    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
            <nav className="fixed z-50 w-full border-b border-white/10 bg-[#06101f]/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <Link href="#home" className="flex flex-shrink-0 items-center">
                            <img
                                src={ATMOSPHERES.seal}
                                alt="Zen AI Healthcare"
                                className="h-11 w-11 rounded-full bg-white object-contain p-1"
                            />
                        </Link>

                        <div className="hidden items-center space-x-8 md:flex">
                            {navLinks.map((link) =>
                                link.href === '#contact' ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-emerald-700"
                                    >
                                        Contact
                                    </a>
                                ) : (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="font-medium text-slate-200 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </a>
                                ),
                            )}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-slate-200"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen ? (
                    <div className="border-b border-white/10 bg-[#06101f] md:hidden">
                        <div className="space-y-2 px-4 pt-2 pb-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 font-medium ${
                                        link.href === '#contact'
                                            ? 'text-emerald-400'
                                            : 'text-slate-200'
                                    }`}
                                >
                                    {link.href === '#contact' ? 'Contact' : link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null}
            </nav>

            {sections.hero ? (
                <section
                    id="home"
                    className="relative overflow-hidden bg-[#04101f] pt-28 pb-24 lg:pt-36 lg:pb-32"
                >
                    <SectionBackdrop
                        src={ATMOSPHERES.hero}
                        overlayClassName="bg-[#04101f]/72"
                    />

                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            style={{ opacity, scale }}
                            className="mx-auto max-w-4xl text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-white p-4 shadow-xl sm:h-48 sm:w-48">
                                    <img
                                        src={logoSrc}
                                        alt="Zen AI Healthcare"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                {content.hero.badge ? (
                                    <p className="mb-5 text-sm font-medium tracking-wide text-emerald-200">
                                        {content.hero.badge}
                                    </p>
                                ) : null}
                                <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                                    {content.hero.headlineLead}
                                    <br />
                                    <span className="text-emerald-300">
                                        {content.hero.headlineAccent}
                                    </span>
                                </h1>
                                <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl">
                                    {content.hero.subheadline}
                                </p>
                                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                    <a
                                        href="#services"
                                        className="rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-emerald-700"
                                    >
                                        {content.hero.primaryCta}
                                    </a>
                                    <a
                                        href="#about"
                                        className="rounded-full border border-stone-200 bg-white px-8 py-4 font-semibold text-stone-800 transition-colors hover:bg-stone-100"
                                    >
                                        {content.hero.secondaryCta}
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            ) : null}

            {sections.about || sections.philosophy ? (
                <section id="about" className="relative overflow-hidden bg-teal-950 py-24">
                    <SectionBackdrop
                        src={ATMOSPHERES.about}
                        className="bg-teal-950"
                        overlayClassName="bg-teal-950/70"
                    />
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {sections.about ? (
                            <div className="mx-auto mb-14 max-w-3xl text-center">
                                <h2 className="mb-5 text-3xl font-bold text-white md:text-4xl">
                                    {content.about.title}
                                </h2>
                                <p className="text-lg leading-relaxed text-teal-50">
                                    {content.about.body}
                                </p>
                            </div>
                        ) : null}

                        {sections.philosophy ? (
                            <>
                                <h3 className="mb-8 text-center text-2xl font-bold text-white">
                                    {content.philosophy.title}
                                </h3>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                                    {content.philosophy.cards.map((card) => {
                                        const Icon =
                                            philosophyIcons[
                                                card.id as keyof typeof philosophyIcons
                                            ] ?? Sparkles;
                                        return (
                                            <div
                                                key={card.id}
                                                className="rounded-2xl border border-white/20 bg-white p-6 shadow-sm"
                                            >
                                                <Icon
                                                    className="mb-4 h-6 w-6 text-emerald-700"
                                                    aria-hidden
                                                />
                                                <h4 className="mb-2 text-lg font-semibold text-stone-900">
                                                    {card.title}
                                                </h4>
                                                <p className="leading-relaxed text-stone-600">
                                                    {card.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : null}
                    </div>
                </section>
            ) : null}

            {sections.services ? (
                <section
                    id="services"
                    className="relative overflow-hidden bg-[#071428] py-24 text-white"
                >
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-35"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 18% 22%, rgba(34,211,238,0.16), transparent 28%), radial-gradient(circle at 82% 12%, rgba(16,185,129,0.12), transparent 24%), linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)',
                            backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
                        }}
                    />
                    <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center md:mb-14">
                            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                {content.servicesSection.headline}
                            </h2>
                            <p className="mx-auto max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
                                {content.servicesSection.intro}
                            </p>
                        </div>

                        <div className="space-y-5 md:space-y-6">
                            {content.services.map((service) => (
                                <article
                                    key={service.slug}
                                    className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#12263f]/85"
                                >
                                    <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                                        <div className="relative min-h-48 overflow-hidden md:min-h-56">
                                            {service.imageSrc ? (
                                                <img
                                                    src={service.imageSrc}
                                                    alt={service.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div
                                                    className={`flex h-full min-h-48 items-center justify-center md:min-h-56 ${serviceIconColors[service.icon]}`}
                                                >
                                                    <ServiceIcon
                                                        icon={service.icon}
                                                        className="h-12 w-12"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8">
                                            <h3 className="text-xl font-bold text-white md:text-2xl">
                                                {service.title}
                                            </h3>
                                            {service.tagline ? (
                                                <p className="mt-2 text-sm font-medium text-cyan-300 md:text-base">
                                                    {service.tagline}
                                                </p>
                                            ) : null}
                                            <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-[15px]">
                                                {service.summary}
                                            </p>
                                            <div className="mt-6">
                                                <Link
                                                    href={`/services/${service.slug}`}
                                                    className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-400"
                                                >
                                                    View {service.title}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}

            {sections.gallery ? (
                <section id="gallery" className="relative overflow-hidden bg-stone-200 py-24">
                    <SectionBackdrop
                        src={ATMOSPHERES.gallery}
                        className="bg-stone-200"
                        overlayClassName="bg-white/80"
                    />
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                                {content.gallery.title}
                            </h2>
                            {content.gallery.intro ? (
                                <p className="mx-auto max-w-2xl text-lg text-stone-700">
                                    {content.gallery.intro}
                                </p>
                            ) : null}
                        </div>

                        <div className="mb-8 flex flex-wrap justify-center gap-3">
                            <GalleryFilterButton
                                active={activeAlbumId === 'all'}
                                onClick={() => setActiveAlbumId('all')}
                            >
                                All
                            </GalleryFilterButton>
                            {albums.map((album) => (
                                <GalleryFilterButton
                                    key={album.id}
                                    active={activeAlbumId === album.id}
                                    onClick={() => setActiveAlbumId(album.id)}
                                >
                                    {album.title}
                                </GalleryFilterButton>
                            ))}
                        </div>

                        <GalleryCarousel photos={galleryPhotos} />

                        <div className="mt-8 text-center">
                            <Link
                                href="/gallery"
                                className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm transition-colors hover:border-emerald-400 hover:bg-emerald-50"
                            >
                                View all gallery
                            </Link>
                        </div>
                    </div>
                </section>
            ) : null}

            {sections.events ? (
                <section id="events" className="relative overflow-hidden bg-stone-900 py-24 text-white">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-30"
                        style={{
                            backgroundImage:
                                'radial-gradient(circle at 70% 20%, rgba(16,185,129,0.25), transparent 35%), radial-gradient(circle at 20% 80%, rgba(14,165,233,0.18), transparent 30%)',
                        }}
                    />
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                                {content.eventsSection.title}
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-stone-300">
                                {content.eventsSection.intro}
                            </p>
                        </div>

                        {featuredEvent ? (
                            <div className="grid items-start gap-10 lg:grid-cols-2">
                                <div className="overflow-hidden rounded-3xl border border-stone-700 bg-stone-800">
                                    {featuredEvent.posterSrc ? (
                                        <img
                                            src={featuredEvent.posterSrc}
                                            alt={featuredEvent.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex min-h-80 items-center justify-center p-8 text-stone-400">
                                            Event poster coming soon
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                                        {featuredEvent.title}
                                    </h3>

                                    {(featuredEvent.date || featuredEvent.venue) && (
                                        <div className="mb-6 space-y-3 rounded-2xl border border-stone-700 bg-stone-800/70 p-5">
                                            <div className="flex items-start gap-3">
                                                <CalendarDays className="mt-0.5 h-5 w-5 text-emerald-400" />
                                                <div>
                                                    {featuredEvent.date ? (
                                                        <p className="font-medium">
                                                            {featuredEvent.date}
                                                        </p>
                                                    ) : null}
                                                    {featuredEvent.venue ? (
                                                        <p className="text-stone-400">
                                                            {featuredEvent.venue}
                                                        </p>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {featuredEvent.details ? (
                                        <p className="whitespace-pre-line text-stone-300">
                                            {featuredEvent.details}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-stone-700 px-6 py-16 text-center text-stone-400">
                                No upcoming events at the moment.
                            </div>
                        )}
                    </div>
                </section>
            ) : null}

            {sections.contact ? (
                <section id="contact" className="relative overflow-hidden bg-emerald-950 py-24">
                    <SectionBackdrop
                        src={ATMOSPHERES.contact}
                        className="bg-emerald-950"
                        overlayClassName="bg-emerald-950/65"
                    />
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-14 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                                {content.contact.title}
                            </h2>
                            <p className="text-lg text-emerald-50">{content.contact.intro}</p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-3">
                            <div className="rounded-2xl border border-white/20 bg-white p-8 text-center shadow-sm">
                                <Phone
                                    className="mx-auto mb-4 h-6 w-6 text-emerald-700"
                                    aria-hidden
                                />
                                <h3 className="mb-2 font-semibold text-stone-900">WhatsApp</h3>
                                <a
                                    href={content.contact.whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-stone-600 transition-colors hover:text-emerald-600"
                                >
                                    {content.contact.whatsappLabel}
                                </a>
                            </div>

                            <div className="rounded-2xl border border-white/20 bg-white p-8 text-center shadow-sm">
                                <Mail
                                    className="mx-auto mb-4 h-6 w-6 text-emerald-700"
                                    aria-hidden
                                />
                                <h3 className="mb-2 font-semibold text-stone-900">Email</h3>
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="text-stone-600 transition-colors hover:text-emerald-600"
                                >
                                    {content.contact.email}
                                </a>
                            </div>

                            <div className="rounded-2xl border border-white/20 bg-white p-8 text-center shadow-sm">
                                <MapPin
                                    className="mx-auto mb-4 h-6 w-6 text-emerald-700"
                                    aria-hidden
                                />
                                <h3 className="mb-2 font-semibold text-stone-900">Visit</h3>
                                <p className="whitespace-pre-line text-stone-600">
                                    {content.contact.address}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

            {sections.footer ? (
                <footer className="border-t border-stone-800 bg-stone-950 py-12 text-stone-400">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-white p-1.5">
                                    <img
                                        src={logoSrc}
                                        alt="Zen AI Healthcare"
                                        className="h-8 w-auto"
                                    />
                                </div>
                            </div>
                            <div className="max-w-xl text-center text-sm md:text-right">
                                <p className="mb-2 text-stone-300">{content.footer.tagline}</p>
                                <p>
                                    &copy; {new Date().getFullYear()}{' '}
                                    {content.footer.copyrightName}. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            ) : null}
        </div>
    );
}
