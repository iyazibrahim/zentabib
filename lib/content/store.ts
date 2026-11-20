import { promises as fs } from 'fs';
import path from 'path';
import { getDefaultSiteContent } from './defaults';
import { normalizeSiteContent } from './normalize';
import type { SiteContent } from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const SITE_FILE = path.join(DATA_DIR, 'site.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');

export function getUploadsDir(...segments: string[]) {
    return path.join(UPLOADS_DIR, ...segments);
}

export async function ensureContentDirs() {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(path.join(UPLOADS_DIR, 'gallery'), { recursive: true });
    await fs.mkdir(path.join(UPLOADS_DIR, 'events'), { recursive: true });
    await fs.mkdir(path.join(UPLOADS_DIR, 'branding'), { recursive: true });
}

async function readRawSiteFile(): Promise<unknown | null> {
    try {
        const raw = await fs.readFile(SITE_FILE, 'utf8');
        if (!raw.trim()) {
            return null;
        }
        return JSON.parse(raw) as unknown;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }
        if (error instanceof SyntaxError) {
            console.error('Corrupt site.json detected; restoring defaults.');
            return null;
        }
        throw error;
    }
}

export async function getSiteContent(): Promise<SiteContent> {
    await ensureContentDirs();
    const raw = await readRawSiteFile();
    if (!raw) {
        const defaults = getDefaultSiteContent();
        await saveSiteContent(defaults);
        return defaults;
    }
    return normalizeSiteContent(raw);
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
    await ensureContentDirs();
    const normalized = normalizeSiteContent(content);
    const payload = `${JSON.stringify(normalized, null, 2)}\n`;
    const tempFile = `${SITE_FILE}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tempFile, payload, 'utf8');
    await fs.copyFile(tempFile, SITE_FILE);
    await fs.unlink(tempFile).catch(() => undefined);
}

export async function getServiceBySlug(slug: string) {
    const content = await getSiteContent();
    return content.services.find((service) => service.slug === slug) ?? null;
}
