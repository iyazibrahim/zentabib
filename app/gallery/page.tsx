import GalleryPageView from '@/components/gallery-page-view';
import { getSiteContent } from '@/lib/content/store';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Gallery',
    description: 'Partnerships, hospital visits, seminars, and collaborations from Zen AI Healthcare.',
};

export default async function GalleryPage() {
    const content = await getSiteContent();
    const logoSrc = content.brand?.logoSrc || '/zen-ai-logo.png';

    return <GalleryPageView content={content} logoSrc={logoSrc} />;
}
