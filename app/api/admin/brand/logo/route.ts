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
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'file is required' }, { status: 400 });
        }

        const content = await getSiteContent();
        const previous = content.brand?.logoSrc ?? '';
        const src = await saveUploadedImage(file, 'branding');
        content.brand = { logoSrc: src };

        if (previous.startsWith('/uploads/branding/') && previous !== src) {
            await deleteUploadedFile(previous);
        }

        await saveSiteContent(content);
        return NextResponse.json({ ok: true, content });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Upload failed';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
