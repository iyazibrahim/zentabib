import { requireAdmin } from '@/lib/admin-guard';
import { getSiteContent, saveSiteContent } from '@/lib/content/store';
import { saveUploadedImage } from '@/lib/uploads';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const unauthorized = await requireAdmin();
    if (unauthorized) {
        return unauthorized;
    }

    try {
        const formData = await request.formData();
        const albumId = String(formData.get('albumId') ?? '');
        const caption = String(formData.get('caption') ?? '');
        const file = formData.get('file');

        if (!albumId || !(file instanceof File)) {
            return NextResponse.json({ error: 'albumId and file are required' }, { status: 400 });
        }

        const content = await getSiteContent();
        const album = content.gallery.albums.find((item) => item.id === albumId);
        if (!album) {
            return NextResponse.json({ error: 'Album not found' }, { status: 404 });
        }

        const src = await saveUploadedImage(file, 'gallery');
        const nextOrder =
            album.photos.reduce((max, photo) => Math.max(max, photo.order), 0) + 1;

        album.photos.push({
            id: randomUUID(),
            src,
            caption,
            order: nextOrder,
        });

        await saveSiteContent(content);
        return NextResponse.json({ ok: true, content });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
