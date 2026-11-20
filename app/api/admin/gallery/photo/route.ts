import { requireAdmin } from '@/lib/admin-guard';
import { getSiteContent, saveSiteContent } from '@/lib/content/store';
import { deleteUploadedFile } from '@/lib/uploads';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
    const unauthorized = await requireAdmin();
    if (unauthorized) {
        return unauthorized;
    }

    try {
        const body = (await request.json()) as { albumId?: string; photoId?: string };
        const albumId = body.albumId ?? '';
        const photoId = body.photoId ?? '';

        if (!albumId || !photoId) {
            return NextResponse.json(
                { error: 'albumId and photoId are required' },
                { status: 400 },
            );
        }

        const content = await getSiteContent();
        const album = content.gallery.albums.find((item) => item.id === albumId);
        if (!album) {
            return NextResponse.json({ error: 'Album not found' }, { status: 404 });
        }

        const photo = album.photos.find((item) => item.id === photoId);
        if (!photo) {
            return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
        }

        await deleteUploadedFile(photo.src);
        album.photos = album.photos.filter((item) => item.id !== photoId);
        await saveSiteContent(content);

        return NextResponse.json({ ok: true, content });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Delete failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
