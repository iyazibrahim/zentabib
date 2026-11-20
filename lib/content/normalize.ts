import type { SiteContent, SiteEvent } from './types';
import { getDefaultSiteContent } from './defaults';

type LooseEvent = Partial<SiteEvent> & {
    subtitle?: string;
    slogan?: string;
    schedule?: string[];
    acronym?: string;
    acronymMeaning?: string;
    organizers?: string;
    flagships?: { title?: string; description?: string }[];
    details?: string;
};

function migrateEvent(raw: LooseEvent, fallbackId: string): SiteEvent {
    if (typeof raw.details === 'string') {
        return {
            id: raw.id || fallbackId,
            title: raw.title || 'Untitled event',
            date: raw.date || '',
            venue: raw.venue || '',
            details: raw.details,
            posterSrc: raw.posterSrc || '',
            visible: raw.visible ?? true,
            featured: raw.featured ?? false,
        };
    }

    const parts: string[] = [];
    if (raw.subtitle) {
        parts.push(raw.subtitle);
    }
    if (raw.slogan) {
        parts.push(raw.slogan);
    }
    if (raw.schedule?.length) {
        parts.push(['Schedule', ...raw.schedule].join('\n'));
    }
    if (raw.acronym || raw.acronymMeaning) {
        parts.push([raw.acronym, raw.acronymMeaning].filter(Boolean).join('\n'));
    }
    if (raw.flagships?.length) {
        parts.push(
            [
                'Highlights',
                ...raw.flagships.map(
                    (item) => `• ${item.title ?? ''}${item.description ? ` — ${item.description}` : ''}`,
                ),
            ].join('\n'),
        );
    }
    if (raw.organizers) {
        parts.push(`Organisers: ${raw.organizers}`);
    }

    return {
        id: raw.id || fallbackId,
        title: raw.title || 'Untitled event',
        date: raw.date || '',
        venue: raw.venue || '',
        details: parts.join('\n\n'),
        posterSrc: raw.posterSrc || '',
        visible: raw.visible ?? true,
        featured: raw.featured ?? false,
    };
}

export function normalizeSiteContent(raw: unknown): SiteContent {
    const defaults = getDefaultSiteContent();
    const input = (raw && typeof raw === 'object' ? raw : {}) as Partial<SiteContent> & {
        events?: LooseEvent[];
    };

    return {
        ...defaults,
        ...input,
        brand: {
            logoSrc: input.brand?.logoSrc || defaults.brand.logoSrc,
        },
        sections: {
            ...defaults.sections,
            ...(input.sections ?? {}),
        },
        seo: {
            ...defaults.seo,
            ...(input.seo ?? {}),
        },
        hero: {
            ...defaults.hero,
            ...(input.hero ?? {}),
        },
        about: {
            ...defaults.about,
            ...(input.about ?? {}),
        },
        philosophy: {
            ...defaults.philosophy,
            ...(input.philosophy ?? {}),
            cards: input.philosophy?.cards?.length
                ? input.philosophy.cards
                : defaults.philosophy.cards,
        },
        servicesSection: {
            ...defaults.servicesSection,
            ...(input.servicesSection ?? {}),
        },
        services: input.services?.length ? input.services : defaults.services,
        gallery: {
            ...defaults.gallery,
            ...(input.gallery ?? {}),
            albums: input.gallery?.albums?.length
                ? input.gallery.albums
                : defaults.gallery.albums,
        },
        eventsSection: {
            ...defaults.eventsSection,
            ...(input.eventsSection ?? {}),
        },
        events: (input.events?.length ? input.events : defaults.events).map((event, index) =>
            migrateEvent(event, `event-${index + 1}`),
        ),
        contact: {
            ...defaults.contact,
            ...(input.contact ?? {}),
        },
        footer: {
            ...defaults.footer,
            ...(input.footer ?? {}),
        },
    };
}
