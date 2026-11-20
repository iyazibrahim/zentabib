import { promises as fs } from 'fs';
import path from 'path';
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

export async function getSiteContent(): Promise<SiteContent> {
    await ensureContentDirs();
    const raw = await fs.readFile(SITE_FILE, 'utf8');
    return JSON.parse(raw) as SiteContent;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
    await ensureContentDirs();
    const payload = `${JSON.stringify(content, null, 2)}\n`;
    await fs.writeFile(SITE_FILE, payload, 'utf8');
}

export async function getServiceBySlug(slug: string) {
    const content = await getSiteContent();
    return content.services.find((service) => service.slug === slug) ?? null;
}
