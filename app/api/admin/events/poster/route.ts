import { requireAdmin } from '@/lib/admin-guard';
import { getSiteContent, saveSiteContent } from '@/lib/content/store';
import { deleteUploadedFile, saveUploadedImage } from '@/lib/uploads';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();
    if (unauthorized) {
        return unauthorized;
    }

    try {
        const formData = await request.formData();
        const eventId = String(formData.get('eventId') ?? '');
        const file = formData.get('file');

        if (!eventId || !(file instanceof File)) {
            return NextResponse.json({ error: 'eventId and file are required' }, { status: 400 });
        }

        const content = await getSiteContent();
        const event = content.events.find((item) => item.id === eventId);
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        const previous = event.posterSrc;
        const src = await saveUploadedImage(file, 'events');
        event.posterSrc = src;

        if (previous && previous !== src && previous.startsWith('/uploads/events/')) {
            await deleteUploadedFile(previous);
        }

        await saveSiteContent(content);
        return NextResponse.json({ ok: true, content });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
