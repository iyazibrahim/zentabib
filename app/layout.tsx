import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3025';

const siteDescription =
    'Zen AI Healthcare harnesses artificial intelligence and next-generation health technology to deliver smart, accessible wellness and diagnostic solutions—built to serve every community fast, anywhere, affordably, and creatively.';

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: 'Zen AI Healthcare - Advance Healthcare Solution Provider',
        template: '%s | Zen AI Healthcare',
    },
    description: siteDescription,
    icons: {
        icon: '/zen-ai-logo.png',
        apple: '/zen-ai-logo.png',
    },
    openGraph: {
        type: 'website',
        title: 'Zen AI Healthcare - Advance Healthcare Solution Provider',
        description: siteDescription,
        images: ['/zen-ai-logo.png'],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Zen AI Healthcare - Advance Healthcare Solution Provider',
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
