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
    tagline: string;
    summary: string;
    description: string;
    bullets: ServiceBullet[];
    icon: 'screening' | 'imaging' | 'monitoring';
    imageSrc: string;
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

export type SiteEvent = {
    id: string;
    title: string;
    date: string;
    venue: string;
    details: string;
    posterSrc: string;
    visible: boolean;
    featured: boolean;
};

export type SectionVisibility = {
    hero: boolean;
    about: boolean;
    philosophy: boolean;
    services: boolean;
    gallery: boolean;
    events: boolean;
    contact: boolean;
    footer: boolean;
};

export type SiteContent = {
    brand: {
        logoSrc: string;
    };
    sections: SectionVisibility;
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
