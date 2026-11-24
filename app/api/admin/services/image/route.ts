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
        const slug = String(formData.get('slug') ?? '');
        const file = formData.get('file');

        if (!slug || !(file instanceof File)) {
            return NextResponse.json({ error: 'slug and file are required' }, { status: 400 });
        }

        const content = await getSiteContent();
        const service = content.services.find((item) => item.slug === slug);
        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        const previous = service.imageSrc;
        const src = await saveUploadedImage(file, 'services');
        service.imageSrc = src;

        if (previous && previous !== src && previous.startsWith('/uploads/services/')) {
            await deleteUploadedFile(previous);
        }

        await saveSiteContent(content);
        return NextResponse.json({ ok: true, content });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
