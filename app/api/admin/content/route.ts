import { requireAdmin } from '@/lib/admin-guard';
import { getSiteContent, saveSiteContent } from '@/lib/content/store';
import type { SiteContent } from '@/lib/content/types';
import { NextResponse } from 'next/server';

export async function GET() {
    const unauthorized = await requireAdmin();
    if (unauthorized) {
        return unauthorized;
    }

    const content = await getSiteContent();
    return NextResponse.json(content);
}

export async function PUT(request: Request) {
    const unauthorized = await requireAdmin();
    if (unauthorized) {
        return unauthorized;
    }

    try {
        const content = (await request.json()) as SiteContent;
        if (!content?.hero || !Array.isArray(content.services)) {
            return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
        }

        await saveSiteContent(content);
        return NextResponse.json({ ok: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to save content';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
