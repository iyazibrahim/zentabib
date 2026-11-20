import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';
import { ensureContentDirs, getUploadsDir } from './content/store';

const ALLOWED_TYPES: Record<string, string> = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
};

export type UploadFolder = 'gallery' | 'events' | 'branding';

export async function saveUploadedImage(file: File, folder: UploadFolder) {
    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
        throw new Error('Unsupported image type. Use JPG, PNG, WEBP, or GIF.');
    }

    if (file.size > 8 * 1024 * 1024) {
        throw new Error('Image must be 8MB or smaller.');
    }

    await ensureContentDirs();
    const filename = `${Date.now()}-${randomUUID().slice(0, 8)}${extension}`;
    const absolutePath = getUploadsDir(folder, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(absolutePath, buffer);

    return `/uploads/${folder}/${filename}`;
}

export async function deleteUploadedFile(publicPath: string) {
    if (!publicPath.startsWith('/uploads/')) {
        return;
    }

    const relative = publicPath.replace(/^\//, '');
    const absolutePath = path.join(process.cwd(), 'public', relative);

    try {
        await fs.unlink(absolutePath);
    } catch {
        // Ignore missing files.
    }
}
