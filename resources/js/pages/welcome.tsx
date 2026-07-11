import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, Brain, GraduationCap, Leaf, Stethoscope, ArrowRight, Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const services = [
        {
            title: "Medical Devices",
            description: "State-of-the-art medical equipment bridging traditional wisdom with modern technology.",
            icon: <Stethoscope className="w-8 h-8" />,
            color: "bg-emerald-100 text-emerald-700",
            href: "/medical-devices"
        },
        {
            title: "ZenLive",
            description: "Holistic patient care combining TCM practices with contemporary clinical standards.",
            icon: <Activity className="w-8 h-8" />,
            color: "bg-teal-100 text-teal-700",
            href: "/zenlive"
        },
        {
            title: "AI Diagnose System",
            description: "Advanced AI algorithms for precise and early diagnosis based on TCM principles.",
            icon: <Brain className="w-8 h-8" />,
            color: "bg-cyan-100 text-cyan-700",
            href: "/ai-diagnose-system"
        },
        {
            title: "Herbal Medicine",
            description: "Premium quality natural herbs sourced and processed for maximum efficacy.",
            icon: <Leaf className="w-8 h-8" />,
            color: "bg-green-100 text-green-700"
        },
        {
            title: "TCM Training",
            description: "Comprehensive educational programs for the next generation of TCM practitioners.",
            icon: <GraduationCap className="w-8 h-8" />,
            color: "bg-stone-100 text-stone-700"
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <Head title="Zen AI - Modern TCM Solutions" />

            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <img src="/zen-ai-logo.png" alt="Zen AI" className="h-12 w-auto" />
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#home" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">Home</a>
                            <a href="#services" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">Services</a>
                            <a href="#about" className="text-stone-600 hover:text-emerald-600 transition-colors font-medium">About</a>
                            <a href="#contact" className="px-5 py-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 font-medium">
                                Contact Us
                            </a>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-600 p-2">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="md:hidden bg-white border-b border-stone-100"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <a href="#home" className="block px-3 py-2 text-stone-600 font-medium">Home</a>
                            <a href="#services" className="block px-3 py-2 text-stone-600 font-medium">Services</a>
                            <a href="#about" className="block px-3 py-2 text-stone-600 font-medium">About</a>
                            <a href="#contact" className="block px-3 py-2 text-emerald-600 font-medium">Contact Us</a>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-50 to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-stone-100 to-transparent opacity-60" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        style={{ opacity, scale }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold tracking-wide mb-6">
                                Traditional Wisdom • Modern Technology
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight mb-8 leading-tight">
                                The Future of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                                    Holistic Healthcare
                                </span>
                            </h1>
                            <p className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                Zen AI bridges the gap between Traditional Complementary Medicine (TCM) and cutting-edge AI technology to provide comprehensive wellness solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="#services" className="px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 group">
                                    Explore Services
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a href="#about" className="px-8 py-4 bg-white text-stone-700 border border-stone-200 rounded-full font-semibold hover:bg-stone-50 transition-all flex items-center justify-center">
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Our Expertise</h2>
                        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
                            Comprehensive TCM solutions powered by innovation and tradition.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={service.href ? { y: -5 } : {}}
                                className={`bg-stone-50 rounded-2xl p-8 border border-stone-100 transition-all duration-300 group relative ${service.href ? 'hover:shadow-xl cursor-pointer' : ''}`}
                            >
                                {service.href && (
                                    <Link href={service.href} className="absolute inset-0 z-10">
                                        <span className="sr-only">View details for {service.title}</span>
                                    </Link>
                                )}
                                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                                <p className="text-stone-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-stone-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                Harmonizing <span className="text-emerald-400">Nature</span> with <span className="text-teal-400">Intelligence</span>
                            </h2>
                            <p className="text-stone-300 text-lg mb-6 leading-relaxed">
                                At Zen AI, we believe in the power of balance. Our mission is to modernize Traditional Complementary Medicine through the integration of Artificial Intelligence, making holistic healthcare more accessible, accurate, and effective.
                            </p>
                            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                                From AI-driven diagnostic tools to premium herbal formulations and professional training, we are building an ecosystem that respects tradition while embracing the future.
                            </p>

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="text-4xl font-bold text-emerald-400 mb-2">5+</div>
                                    <div className="text-stone-400">Key Specializations</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-teal-400 mb-2">100%</div>
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
                            <div className="aspect-square rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/20 absolute inset-0 blur-3xl" />
                            <div className="relative bg-stone-800 rounded-3xl p-8 border border-stone-700 shadow-2xl">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-stone-700/50 p-6 rounded-2xl">
                                        <Brain className="w-10 h-10 text-emerald-400 mb-4" />
                                        <div className="font-semibold">AI Integration</div>
                                    </div>
                                    <div className="bg-stone-700/50 p-6 rounded-2xl">
                                        <Leaf className="w-10 h-10 text-teal-400 mb-4" />
                                        <div className="font-semibold">Natural Healing</div>
                                    </div>
                                    <div className="bg-stone-700/50 p-6 rounded-2xl">
                                        <Stethoscope className="w-10 h-10 text-cyan-400 mb-4" />
                                        <div className="font-semibold">Modern Devices</div>
                                    </div>
                                    <div className="bg-stone-700/50 p-6 rounded-2xl">
                                        <GraduationCap className="w-10 h-10 text-green-400 mb-4" />
                                        <div className="font-semibold">Expert Training</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-emerald-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">Get in Touch</h2>
                        <p className="text-lg text-stone-600">
                            Ready to experience the future of TCM? Contact us today.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 text-center"
                        >
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">Contact Us</h3>
                            <a
                                href="https://api.whatsapp.com/send/?phone=6001112332101&text&type=phone_number&app_absent=0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-stone-600 hover:text-emerald-600 transition-colors"
                            >
                                +601112332101 (Whatsapp only)
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 text-center"
                        >
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">Email Us</h3>
                            <p className="text-stone-600">rohaizan@zentabib.com</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 text-center"
                        >
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-stone-900 mb-2">Visit Us</h3>
                            <p className="text-stone-600">Health and Environment Research Group. UMS Sabah, Malaysia.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center">
                            <div className="bg-white rounded-lg p-1.5">
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
