'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    Brain,
    GraduationCap,
    Leaf,
    Mail,
    MapPin,
    Menu,
    Phone,
    Stethoscope,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WelcomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const services = [
        {
            title: 'Medical Devices',
            description:
                'State-of-the-art medical equipment bridging traditional wisdom with modern technology.',
            icon: <Stethoscope className="h-8 w-8" />,
            color: 'bg-emerald-100 text-emerald-700',
            href: '/medical-devices',
        },
        {
            title: 'ZenLive',
            description:
                'Holistic patient care combining TCM practices with contemporary clinical standards.',
            icon: <Activity className="h-8 w-8" />,
            color: 'bg-teal-100 text-teal-700',
            href: '/zenlive',
        },
        {
            title: 'AI Diagnose System',
            description:
                'Advanced AI algorithms for precise and early diagnosis based on TCM principles.',
            icon: <Brain className="h-8 w-8" />,
            color: 'bg-cyan-100 text-cyan-700',
            href: '/ai-diagnose-system',
        },
        {
            title: 'Herbal Medicine',
            description:
                'Premium quality natural herbs sourced and processed for maximum efficacy.',
            icon: <Leaf className="h-8 w-8" />,
            color: 'bg-green-100 text-green-700',
        },
        {
            title: 'TCM Training',
            description:
                'Comprehensive educational programs for the next generation of TCM practitioners.',
            icon: <GraduationCap className="h-8 w-8" />,
            color: 'bg-stone-100 text-stone-700',
        },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
    };

    return (
        <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-200 selection:text-emerald-900">
            <nav className="fixed z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <img src="/zen-ai-logo.png" alt="Zen AI" className="h-12 w-auto" />
                        </div>

                        <div className="hidden items-center space-x-8 md:flex">
                            <a
                                href="#home"
                                className="font-medium text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                Home
                            </a>
                            <a
                                href="#services"
                                className="font-medium text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                Services
                            </a>
                            <a
                                href="#about"
                                className="font-medium text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                About
                            </a>
                            <a
                                href="#contact"
                                className="rounded-full bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                            >
                                Contact Us
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 text-stone-600"
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
                            <a href="#home" className="block px-3 py-2 font-medium text-stone-600">
                                Home
                            </a>
                            <a
                                href="#services"
                                className="block px-3 py-2 font-medium text-stone-600"
                            >
                                Services
                            </a>
                            <a href="#about" className="block px-3 py-2 font-medium text-stone-600">
                                About
                            </a>
                            <a
                                href="#contact"
                                className="block px-3 py-2 font-medium text-emerald-600"
                            >
                                Contact Us
                            </a>
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
                                Traditional Wisdom • Modern Technology
                            </span>
                            <h1 className="mb-8 text-5xl leading-tight font-bold tracking-tight text-stone-900 md:text-7xl">
                                The Future of <br />
                                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                    Holistic Healthcare
                                </span>
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-stone-600">
                                Zen AI bridges the gap between Traditional Complementary Medicine
                                (TCM) and cutting-edge AI technology to provide comprehensive
                                wellness solutions.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <a
                                    href="#services"
                                    className="group flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white shadow-xl shadow-emerald-600/20 transition-all hover:bg-emerald-700"
                                >
                                    Explore Services
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="#about"
                                    className="flex items-center justify-center rounded-full border border-stone-200 bg-white px-8 py-4 font-semibold text-stone-700 transition-all hover:bg-stone-50"
                                >
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section id="services" className="relative bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                            Our Expertise
                        </h2>
                        <p className="mx-auto max-w-2xl text-lg text-stone-600">
                            Comprehensive TCM solutions powered by innovation and tradition.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={service.href ? { y: -5 } : {}}
                                className={`group relative rounded-2xl border border-stone-100 bg-stone-50 p-8 transition-all duration-300 ${service.href ? 'cursor-pointer hover:shadow-xl' : ''}`}
                            >
                                {service.href && (
                                    <Link href={service.href} className="absolute inset-0 z-10">
                                        <span className="sr-only">
                                            View details for {service.title}
                                        </span>
                                    </Link>
                                )}
                                <div
                                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl ${service.color} transition-transform duration-300 group-hover:scale-110`}
                                >
                                    {service.icon}
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-stone-900">
                                    {service.title}
                                </h3>
                                <p className="leading-relaxed text-stone-600">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="about" className="overflow-hidden bg-stone-900 py-24 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="mb-8 text-3xl leading-tight font-bold md:text-5xl">
                                Harmonizing <span className="text-emerald-400">Nature</span> with{' '}
                                <span className="text-teal-400">Intelligence</span>
                            </h2>
                            <p className="mb-6 text-lg leading-relaxed text-stone-300">
                                At Zen AI, we believe in the power of balance. Our mission is to
                                modernize Traditional Complementary Medicine through the
                                integration of Artificial Intelligence, making holistic healthcare
                                more accessible, accurate, and effective.
                            </p>
                            <p className="mb-8 text-lg leading-relaxed text-stone-300">
                                From AI-driven diagnostic tools to premium herbal formulations and
                                professional training, we are building an ecosystem that respects
                                tradition while embracing the future.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="mb-2 text-4xl font-bold text-emerald-400">
                                        5+
                                    </div>
                                    <div className="text-stone-400">Key Specializations</div>
                                </div>
                                <div>
                                    <div className="mb-2 text-4xl font-bold text-teal-400">100%</div>
                                    <div className="text-stone-400">Dedication to Wellness</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 aspect-square rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 blur-3xl" />
                            <div className="relative rounded-3xl border border-stone-700 bg-stone-800 p-8 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl bg-stone-700/50 p-6">
                                        <Brain className="mb-4 h-10 w-10 text-emerald-400" />
                                        <div className="font-semibold">AI Integration</div>
                                    </div>
                                    <div className="rounded-2xl bg-stone-700/50 p-6">
                                        <Leaf className="mb-4 h-10 w-10 text-teal-400" />
                                        <div className="font-semibold">Natural Healing</div>
                                    </div>
                                    <div className="rounded-2xl bg-stone-700/50 p-6">
                                        <Stethoscope className="mb-4 h-10 w-10 text-cyan-400" />
                                        <div className="font-semibold">Modern Devices</div>
                                    </div>
                                    <div className="rounded-2xl bg-stone-700/50 p-6">
                                        <GraduationCap className="mb-4 h-10 w-10 text-green-400" />
                                        <div className="font-semibold">Expert Training</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section id="contact" className="bg-emerald-50 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...fadeInUp} className="mb-16 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-stone-900 md:text-4xl">
                            Get in Touch
                        </h2>
                        <p className="text-lg text-stone-600">
                            Ready to experience the future of TCM? Contact us today.
                        </p>
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
                                href="https://api.whatsapp.com/send/?phone=6001112332101&text&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-600 transition-colors hover:text-emerald-600"
                            >
                                +601112332101 (Whatsapp only)
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
                            <p className="text-stone-600">rohaizan@zentabib.com</p>
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
                            <p className="text-stone-600">
                                Health and Environment Research Group. UMS Sabah, Malaysia.
                            </p>
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
                        <div className="text-sm">
                            &copy; {new Date().getFullYear()} Zen AI. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
