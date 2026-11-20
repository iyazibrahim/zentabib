import WelcomePage from '@/components/welcome-page';
import { getSiteContent } from '@/lib/content/store';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const content = await getSiteContent();
    return {
        title: content.seo.title,
        description: content.seo.description,
    };
}

export default async function Home() {
    const content = await getSiteContent();
    return <WelcomePage content={content} />;
}
