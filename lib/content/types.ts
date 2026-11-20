export type PhilosophyCard = {
    id: string;
    title: string;
    description: string;
};

export type ServiceBullet = {
    label: string;
    text: string;
};

export type Service = {
    slug: string;
    title: string;
    summary: string;
    description: string;
    bullets: ServiceBullet[];
    icon: 'screening' | 'imaging' | 'monitoring';
};

export type GalleryPhoto = {
    id: string;
    src: string;
    caption: string;
    order: number;
};

export type GalleryAlbum = {
    id: string;
    title: string;
    order: number;
    photos: GalleryPhoto[];
};

export type EventFlagship = {
    title: string;
    description: string;
};

export type SiteEvent = {
    id: string;
    title: string;
    subtitle: string;
    slogan: string;
    date: string;
    venue: string;
    schedule: string[];
    acronym: string;
    acronymMeaning: string;
    flagships: EventFlagship[];
    organizers: string;
    posterSrc: string;
    visible: boolean;
    featured: boolean;
};

export type SiteContent = {
    seo: {
        title: string;
        description: string;
    };
    hero: {
        badge: string;
        headlineLead: string;
        headlineAccent: string;
        subheadline: string;
        primaryCta: string;
        secondaryCta: string;
    };
    about: {
        title: string;
        body: string;
    };
    philosophy: {
        title: string;
        cards: PhilosophyCard[];
    };
    servicesSection: {
        headline: string;
        intro: string;
    };
    services: Service[];
    gallery: {
        title: string;
        intro: string;
        albums: GalleryAlbum[];
    };
    eventsSection: {
        title: string;
        intro: string;
    };
    events: SiteEvent[];
    contact: {
        title: string;
        intro: string;
        whatsappLabel: string;
        whatsappUrl: string;
        email: string;
        address: string;
    };
    footer: {
        tagline: string;
        copyrightName: string;
    };
};
