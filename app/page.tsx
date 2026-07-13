import type { Metadata } from 'next';
import WelcomePage from '@/components/welcome-page';

export const metadata: Metadata = {
    title: 'Modern TCM Solutions',
};

export default function Home() {
    return <WelcomePage />;
}
