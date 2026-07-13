import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const siteDescription =
    'Zen AI - Bridging Traditional Wisdom with Modern Technology. Medical Devices, ZenLive, AI Diagnosis, Herbal Medicine, and TCM Training.';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Zen AI - Modern TCM Solutions',
        template: '%s | Zen AI',
    },
    description: siteDescription,
    icons: {
        icon: '/zen-ai-logo.png',
        apple: '/zen-ai-logo.png',
    },
    openGraph: {
        type: 'website',
        title: 'Zen AI - Modern TCM Solutions',
        description: siteDescription,
        images: ['/zen-ai-logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Zen AI - Modern TCM Solutions',
        description: siteDescription,
        images: ['/zen-ai-logo.png'],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </head>
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
