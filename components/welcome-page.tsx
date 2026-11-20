'use client';

import { ServiceIcon, serviceIconColors } from '@/lib/service-icons';
import type { SiteContent } from '@/lib/content/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight,
    CalendarDays,
    Clock3,
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

    const featuredEvent = content.events.find((event) => event.visible && event.featured) ??
        content.events.find((event) => event.visible) ??
        null;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
    };

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#services', label: 'Services' },
        { href: '#about', label: 'About' },
        { href: '#gallery', label: 'Gallery' },
        { href: '#events', label: 'Events' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
            <nav className="fixed z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <img src="/zen-ai-logo.png" alt="Zen AI" className="h-12 w-auto" />
                        </div>

                        <div className="hidden items-center space-x-8 md:flex">
                            {navLinks.map((link) =>
                                link.href === '#contact' ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                                    >
                                        Contact Us
                                    </a>
                                ) : (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="font-medium text-stone-600 transition-colors hover:text-emerald-600"
                                    >
                                        {link.label}
                                    </a>
                                ),
                            )}
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-stone-600"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-b border-stone-100 bg-white md:hidden"
                    >
                        <div className="space-y-2 px-4 pt-2 pb-6">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`block px-3 py-2 font-medium ${
                                        link.href === '#contact'
                                            ? 'text-emerald-600'
                                            : 'text-stone-600'
                                    }`}
                                >
                                    {link.href === '#contact' ? 'Contact Us' : link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </nav>

            <section id="home" className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-emerald-50 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 h-1/2 w-1/2 bg-gradient-to-tr from-stone-100 to-transparent opacity-60" />
                </div>

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div style={{ opacity, scale }} className="mx-auto max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="mb-6 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold tracking-wide text-emerald-800">
                                {content.hero.badge}
                            </span>
                            <h1 className="mb-8 text-5xl leading-tight font-bold tracking-tight text-stone-900 md:text-7xl">
                                {content.hero.headlineLead} <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    {content.hero.headlineAccent}
                                </span>
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-stone-600">
                                {content.hero.subheadline}
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <a
                                    href="#services"
                                    className="group flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                                >
                                    {content.hero.primaryCta}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="#about"
                                    className="flex items-center justify-center rounded-full border border-stone-200 bg-white px-8 py-4 font-semibold text-stone-700 transition-all hover:bg-stone-50"
                                >
                                    {content.hero.secondaryCta}
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="about" className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mx-auto mb-16 max-w-3xl text-center">
                        <h2 className="mb-6 text-3xl font-bold text-stone-900 md:text-4xl">
                            {content.about.title}
                        </h2>
                        <p className="text-lg leading-relaxed text-stone-600">{content.about.body}</p>
                    </motion.div>

                    <div className="mb-4 text-center">
                        <h3 className="mb-10 text-2xl font-bold text-stone-900">
                            {content.philosophy.title}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {content.philosophy.cards.map((card, index) => {
                            const Icon =
                                philosophyIcons[card.id as keyof typeof philosophyIcons] ??
                                Sparkles;
                            return (
                                <motion.div
                                    key={card.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                    className="rounded-2xl border border-stone-100 bg-stone-50 p-6"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h4 className="mb-3 text-xl font-bold text-stone-900">
                                        {card.title}
                                    </h4>
                                    <p className="leading-relaxed text-stone-600">
                                        {card.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="services" className="relative bg-stone-50 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                            {content.servicesSection.headline}
                        </h2>
                        <p className="mx-auto max-w-3xl text-lg text-stone-600">
                            {content.servicesSection.intro}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {content.services.map((service, index) => (
                            <motion.div
                                key={service.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative rounded-2xl border border-stone-100 bg-white p-8 transition-all duration-300 hover:shadow-xl"
                            >
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="absolute inset-0 z-10"
                                >
                                    <span className="sr-only">View details for {service.title}</span>
                                </Link>
                                <div
                                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${serviceIconColors[service.icon]} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    <ServiceIcon icon={service.icon} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-stone-900">
                                    {service.title}
                                </h3>
                                <p className="leading-relaxed text-stone-600">{service.summary}</p>
                                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                    Learn more
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="gallery" className="bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                            {content.gallery.title}
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-stone-600">
                            {content.gallery.intro}
                        </p>
                    </motion.div>

                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveAlbumId('all')}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                activeAlbumId === 'all'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                        >
                            All
                        </button>
                        {albums.map((album) => (
                            <button
                                key={album.id}
                                type="button"
                                onClick={() => setActiveAlbumId(album.id)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeAlbumId === album.id
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                }`}
                            >
                                {album.title}
                            </button>
                        ))}
                    </div>

                    {galleryPhotos.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-stone-200 bg-stone-50 px-6 py-16 text-center">
                            <p className="text-stone-600">
                                Photos for this album will appear here once uploaded in the admin
                                panel.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {galleryPhotos.map((photo, index) => (
                                <motion.figure
                                    key={photo.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="overflow-hidden rounded-2xl border border-stone-100 bg-stone-50 shadow-sm"
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.caption || photo.albumTitle}
                                        className="h-56 w-full object-cover"
                                    />
                                    <figcaption className="space-y-1 p-4">
                                        <p className="text-sm font-medium text-emerald-700">
                                            {photo.albumTitle}
                                        </p>
                                        {photo.caption ? (
                                            <p className="text-sm text-stone-600">{photo.caption}</p>
                                        ) : null}
                                    </figcaption>
                                </motion.figure>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section id="events" className="bg-stone-900 py-24 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                            {content.eventsSection.title}
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-stone-300">
                            {content.eventsSection.intro}
                        </p>
                    </motion.div>

                    {featuredEvent ? (
                        <div className="grid items-start gap-10 lg:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="overflow-hidden rounded-3xl border border-stone-700 bg-stone-800"
                            >
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
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <p className="mb-3 text-sm font-semibold tracking-wide text-emerald-400 uppercase">
                                    {featuredEvent.subtitle}
                                </p>
                                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                                    {featuredEvent.title}
                                </h3>
                                <p className="mb-6 text-lg text-stone-300">{featuredEvent.slogan}</p>

                                <div className="mb-6 space-y-3 rounded-2xl border border-stone-700 bg-stone-800/70 p-5">
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="mt-0.5 h-5 w-5 text-emerald-400" />
                                        <div>
                                            <p className="font-medium">{featuredEvent.date}</p>
                                            <p className="text-stone-400">{featuredEvent.venue}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock3 className="mt-0.5 h-5 w-5 text-emerald-400" />
                                        <div className="space-y-1">
                                            {featuredEvent.schedule.map((item) => (
                                                <p key={item} className="text-stone-300">
                                                    {item}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                                    <p className="mb-1 text-lg font-bold text-emerald-300">
                                        {featuredEvent.acronym}
                                    </p>
                                    <p className="text-sm text-stone-300">
                                        {featuredEvent.acronymMeaning}
                                    </p>
                                </div>

                                <div className="mb-8 space-y-4">
                                    <h4 className="text-xl font-semibold">Three Flagship Technologies</h4>
                                    {featuredEvent.flagships.map((flagship) => (
                                        <div
                                            key={flagship.title}
                                            className="rounded-xl border border-stone-700 bg-stone-800/60 p-4"
                                        >
                                            <p className="mb-1 font-semibold text-emerald-300">
                                                {flagship.title}
                                            </p>
                                            <p className="text-sm text-stone-300">
                                                {flagship.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-sm text-stone-400">
                                    Organisers: {featuredEvent.organizers}
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-stone-700 px-6 py-16 text-center text-stone-400">
                            No upcoming events at the moment.
                        </div>
                    )}
                </div>
            </section>

            <section id="contact" className="bg-emerald-50 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                            {content.contact.title}
                        </h2>
                        <p className="text-lg text-stone-600">{content.contact.intro}</p>
                    </motion.div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-semibold text-stone-900">Contact Us</h3>
                            <a
                                href={content.contact.whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                {content.contact.whatsappLabel}
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-semibold text-stone-900">Email Us</h3>
                            <a
                                href={`mailto:${content.contact.email}`}
                                className="text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                {content.contact.email}
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 font-semibold text-stone-900">Visit Us</h3>
                            <p className="text-stone-600">{content.contact.address}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="border-t border-stone-800 bg-stone-900 py-12 text-stone-400">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-white p-1.5">
                                <img src="/zen-ai-logo.png" alt="Zen AI" className="h-8 w-auto" />
                            </div>
                        </div>
                        <div className="max-w-xl text-center text-sm md:text-right">
                            <p className="mb-2 text-stone-300">{content.footer.tagline}</p>
                            <p>
                                &copy; {new Date().getFullYear()} {content.footer.copyrightName}.
                                All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
