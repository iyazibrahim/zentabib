import AdminApp from '@/components/admin/admin-app';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Admin',
    robots: {
        index: false,
        follow: false,
    },
};

export default function AdminPage() {
    return <AdminApp />;
}
