'use client';

import type { GalleryAlbum, SiteContent, SiteEvent } from '@/lib/content/types';
import { randomUUID } from '@/lib/client-id';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

type Tab = 'site' | 'services' | 'gallery' | 'events';

const emptyContentMessage = 'Loading content…';

export default function AdminApp() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [content, setContent] = useState<SiteContent | null>(null);
    const [tab, setTab] = useState<Tab>('site');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    const loadContent = useCallback(async () => {
        const response = await fetch('/api/admin/content');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        const data = (await response.json()) as SiteContent;
        setContent(data);
    }, []);

    useEffect(() => {
        async function boot() {
            try {
                const me = await fetch('/api/admin/me');
                const payload = (await me.json()) as { authenticated: boolean };
                setAuthenticated(payload.authenticated);
                if (payload.authenticated) {
                    await loadContent();
                }
            } catch {
                setAuthenticated(false);
            } finally {
                setCheckingAuth(false);
            }
        }

        void boot();
    }, [loadContent]);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        setError('');
        setStatus('');

        const response = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            const payload = (await response.json()) as { error?: string };
            setError(payload.error ?? 'Login failed');
            return;
        }

        setAuthenticated(true);
        setPassword('');
        await loadContent();
        setStatus('Signed in');
    }

    async function handleLogout() {
        await fetch('/api/admin/logout', { method: 'POST' });
        setAuthenticated(false);
        setContent(null);
        setStatus('Signed out');
    }

    async function handleSave() {
        if (!content) {
            return;
        }

        setSaving(true);
        setError('');
        setStatus('');

        try {
            const response = await fetch('/api/admin/content', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content),
            });

            if (!response.ok) {
                const payload = (await response.json()) as { error?: string };
                throw new Error(payload.error ?? 'Save failed');
            }

            setStatus('Saved. Homepage will show the new content on refresh.');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Save failed');
        } finally {
            setSaving(false);
        }
    }

    async function handleGalleryUpload(albumId: string, file: File, caption: string) {
        const formData = new FormData();
        formData.set('albumId', albumId);
        formData.set('caption', caption);
        formData.set('file', file);

        const response = await fetch('/api/admin/gallery/upload', {
            method: 'POST',
            body: formData,
        });

        const payload = (await response.json()) as { error?: string; content?: SiteContent };
        if (!response.ok || !payload.content) {
            throw new Error(payload.error ?? 'Upload failed');
        }

        setContent(payload.content);
        setStatus('Photo uploaded');
    }

    async function handleDeletePhoto(albumId: string, photoId: string) {
        const response = await fetch('/api/admin/gallery/photo', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ albumId, photoId }),
        });

        const payload = (await response.json()) as { error?: string; content?: SiteContent };
        if (!response.ok || !payload.content) {
            throw new Error(payload.error ?? 'Delete failed');
        }

        setContent(payload.content);
        setStatus('Photo deleted');
    }

    async function handleEventPoster(eventId: string, file: File) {
        const formData = new FormData();
        formData.set('eventId', eventId);
        formData.set('file', file);

        const response = await fetch('/api/admin/events/poster', {
            method: 'POST',
            body: formData,
        });

        const payload = (await response.json()) as { error?: string; content?: SiteContent };
        if (!response.ok || !payload.content) {
            throw new Error(payload.error ?? 'Poster upload failed');
        }

        setContent(payload.content);
        setStatus('Event poster updated');
    }

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-600">
                Checking admin session…
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
                >
                    <h1 className="mb-2 text-2xl font-bold text-stone-900">Zen AI Admin</h1>
                    <p className="mb-6 text-sm text-stone-600">
                        Sign in to edit homepage copy, services, gallery, and events.
                    </p>
                    <label className="mb-2 block text-sm font-medium text-stone-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="mb-4 w-full rounded-xl border border-stone-200 px-4 py-3 outline-none focus:border-emerald-500"
                        required
                    />
                    {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700"
                    >
                        Sign in
                    </button>
                    <Link href="/" className="mt-4 block text-center text-sm text-stone-500 hover:text-emerald-600">
                        Back to website
                    </Link>
                </form>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-600">
                {emptyContentMessage}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100 text-stone-800">
            <header className="border-b border-stone-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-stone-900">Website CMS</h1>
                        <p className="text-sm text-stone-500">Edit content without touching code</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                        >
                            View site
                        </Link>
                        <button
                            type="button"
                            onClick={() => void handleSave()}
                            disabled={saving}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {saving ? 'Saving…' : 'Save changes'}
                        </button>
                        <button
                            type="button"
                            onClick={() => void handleLogout()}
                            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 py-6">
                {(status || error) && (
                    <div
                        className={`mb-4 rounded-xl px-4 py-3 text-sm ${
                            error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
                        }`}
                    >
                        {error || status}
                    </div>
                )}

                <div className="mb-6 flex flex-wrap gap-2">
                    {(
                        [
                            ['site', 'Site copy'],
                            ['services', 'Services'],
                            ['gallery', 'Gallery'],
                            ['events', 'Events'],
                        ] as const
                    ).map(([id, label]) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setTab(id)}
                            className={`rounded-full px-4 py-2 text-sm font-medium ${
                                tab === id
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white text-stone-700 hover:bg-stone-50'
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {tab === 'site' ? (
                    <SiteCopyEditor content={content} onChange={setContent} />
                ) : null}
                {tab === 'services' ? (
                    <ServicesEditor content={content} onChange={setContent} />
                ) : null}
                {tab === 'gallery' ? (
                    <GalleryEditor
                        content={content}
                        onChange={setContent}
                        onUpload={handleGalleryUpload}
                        onDeletePhoto={handleDeletePhoto}
                        onError={setError}
                    />
                ) : null}
                {tab === 'events' ? (
                    <EventsEditor
                        content={content}
                        onChange={setContent}
                        onUploadPoster={handleEventPoster}
                        onError={setError}
                    />
                ) : null}
            </div>
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    multiline = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
}) {
    const shared =
        'w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500';

    return (
        <label className="block space-y-1">
            <span className="text-sm font-medium text-stone-700">{label}</span>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    rows={4}
                    className={shared}
                />
            ) : (
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={shared}
                />
            )}
        </label>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-6 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-stone-900">{title}</h2>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

function SiteCopyEditor({
    content,
    onChange,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
}) {
    return (
        <div>
            <Card title="SEO">
                <Field
                    label="Title"
                    value={content.seo.title}
                    onChange={(title) => onChange({ ...content, seo: { ...content.seo, title } })}
                />
                <Field
                    label="Description"
                    value={content.seo.description}
                    multiline
                    onChange={(description) =>
                        onChange({ ...content, seo: { ...content.seo, description } })
                    }
                />
            </Card>

            <Card title="Hero">
                <Field
                    label="Badge"
                    value={content.hero.badge}
                    onChange={(badge) => onChange({ ...content, hero: { ...content.hero, badge } })}
                />
                <Field
                    label="Headline lead"
                    value={content.hero.headlineLead}
                    onChange={(headlineLead) =>
                        onChange({ ...content, hero: { ...content.hero, headlineLead } })
                    }
                />
                <Field
                    label="Headline accent"
                    value={content.hero.headlineAccent}
                    onChange={(headlineAccent) =>
                        onChange({ ...content, hero: { ...content.hero, headlineAccent } })
                    }
                />
                <Field
                    label="Subheadline"
                    value={content.hero.subheadline}
                    multiline
                    onChange={(subheadline) =>
                        onChange({ ...content, hero: { ...content.hero, subheadline } })
                    }
                />
                <Field
                    label="Primary CTA"
                    value={content.hero.primaryCta}
                    onChange={(primaryCta) =>
                        onChange({ ...content, hero: { ...content.hero, primaryCta } })
                    }
                />
                <Field
                    label="Secondary CTA"
                    value={content.hero.secondaryCta}
                    onChange={(secondaryCta) =>
                        onChange({ ...content, hero: { ...content.hero, secondaryCta } })
                    }
                />
            </Card>

            <Card title="About">
                <Field
                    label="Title"
                    value={content.about.title}
                    onChange={(title) =>
                        onChange({ ...content, about: { ...content.about, title } })
                    }
                />
                <Field
                    label="Body"
                    value={content.about.body}
                    multiline
                    onChange={(body) => onChange({ ...content, about: { ...content.about, body } })}
                />
            </Card>

            <Card title="Philosophy">
                <Field
                    label="Section title"
                    value={content.philosophy.title}
                    onChange={(title) =>
                        onChange({
                            ...content,
                            philosophy: { ...content.philosophy, title },
                        })
                    }
                />
                {content.philosophy.cards.map((card, index) => (
                    <div key={card.id} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                        <Field
                            label="Card title"
                            value={card.title}
                            onChange={(title) => {
                                const cards = content.philosophy.cards.slice();
                                cards[index] = { ...card, title };
                                onChange({
                                    ...content,
                                    philosophy: { ...content.philosophy, cards },
                                });
                            }}
                        />
                        <div className="mt-3">
                            <Field
                                label="Description"
                                value={card.description}
                                multiline
                                onChange={(description) => {
                                    const cards = content.philosophy.cards.slice();
                                    cards[index] = { ...card, description };
                                    onChange({
                                        ...content,
                                        philosophy: { ...content.philosophy, cards },
                                    });
                                }}
                            />
                        </div>
                    </div>
                ))}
            </Card>

            <Card title="Services section intro">
                <Field
                    label="Headline"
                    value={content.servicesSection.headline}
                    onChange={(headline) =>
                        onChange({
                            ...content,
                            servicesSection: { ...content.servicesSection, headline },
                        })
                    }
                />
                <Field
                    label="Intro"
                    value={content.servicesSection.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({
                            ...content,
                            servicesSection: { ...content.servicesSection, intro },
                        })
                    }
                />
            </Card>

            <Card title="Contact">
                <Field
                    label="Title"
                    value={content.contact.title}
                    onChange={(title) =>
                        onChange({ ...content, contact: { ...content.contact, title } })
                    }
                />
                <Field
                    label="Intro"
                    value={content.contact.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({ ...content, contact: { ...content.contact, intro } })
                    }
                />
                <Field
                    label="WhatsApp label"
                    value={content.contact.whatsappLabel}
                    onChange={(whatsappLabel) =>
                        onChange({ ...content, contact: { ...content.contact, whatsappLabel } })
                    }
                />
                <Field
                    label="WhatsApp URL"
                    value={content.contact.whatsappUrl}
                    onChange={(whatsappUrl) =>
                        onChange({ ...content, contact: { ...content.contact, whatsappUrl } })
                    }
                />
                <Field
                    label="Email"
                    value={content.contact.email}
                    onChange={(email) =>
                        onChange({ ...content, contact: { ...content.contact, email } })
                    }
                />
                <Field
                    label="Address"
                    value={content.contact.address}
                    multiline
                    onChange={(address) =>
                        onChange({ ...content, contact: { ...content.contact, address } })
                    }
                />
            </Card>

            <Card title="Footer">
                <Field
                    label="Tagline"
                    value={content.footer.tagline}
                    multiline
                    onChange={(tagline) =>
                        onChange({ ...content, footer: { ...content.footer, tagline } })
                    }
                />
                <Field
                    label="Copyright name"
                    value={content.footer.copyrightName}
                    onChange={(copyrightName) =>
                        onChange({ ...content, footer: { ...content.footer, copyrightName } })
                    }
                />
            </Card>
        </div>
    );
}

function ServicesEditor({
    content,
    onChange,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
}) {
    return (
        <div>
            {content.services.map((service, index) => (
                <Card key={service.slug} title={service.title}>
                    <Field
                        label="Slug"
                        value={service.slug}
                        onChange={(slug) => {
                            const services = content.services.slice();
                            services[index] = { ...service, slug };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Title"
                        value={service.title}
                        onChange={(title) => {
                            const services = content.services.slice();
                            services[index] = { ...service, title };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Card summary"
                        value={service.summary}
                        multiline
                        onChange={(summary) => {
                            const services = content.services.slice();
                            services[index] = { ...service, summary };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Detailed description"
                        value={service.description}
                        multiline
                        onChange={(description) => {
                            const services = content.services.slice();
                            services[index] = { ...service, description };
                            onChange({ ...content, services });
                        }}
                    />
                    {service.bullets.map((bullet, bulletIndex) => (
                        <div
                            key={`${service.slug}-${bullet.label}-${bulletIndex}`}
                            className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                        >
                            <Field
                                label="Bullet label"
                                value={bullet.label}
                                onChange={(label) => {
                                    const services = content.services.slice();
                                    const bullets = service.bullets.slice();
                                    bullets[bulletIndex] = { ...bullet, label };
                                    services[index] = { ...service, bullets };
                                    onChange({ ...content, services });
                                }}
                            />
                            <div className="mt-3">
                                <Field
                                    label="Bullet text"
                                    value={bullet.text}
                                    multiline
                                    onChange={(text) => {
                                        const services = content.services.slice();
                                        const bullets = service.bullets.slice();
                                        bullets[bulletIndex] = { ...bullet, text };
                                        services[index] = { ...service, bullets };
                                        onChange({ ...content, services });
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Card>
            ))}
        </div>
    );
}

function GalleryEditor({
    content,
    onChange,
    onUpload,
    onDeletePhoto,
    onError,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
    onUpload: (albumId: string, file: File, caption: string) => Promise<void>;
    onDeletePhoto: (albumId: string, photoId: string) => Promise<void>;
    onError: (message: string) => void;
}) {
    const albums = [...content.gallery.albums].sort((a, b) => a.order - b.order);

    function updateAlbum(albumId: string, updater: (album: GalleryAlbum) => GalleryAlbum) {
        onChange({
            ...content,
            gallery: {
                ...content.gallery,
                albums: content.gallery.albums.map((album) =>
                    album.id === albumId ? updater(album) : album,
                ),
            },
        });
    }

    function addAlbum() {
        const nextOrder =
            content.gallery.albums.reduce((max, album) => Math.max(max, album.order), 0) + 1;
        onChange({
            ...content,
            gallery: {
                ...content.gallery,
                albums: [
                    ...content.gallery.albums,
                    {
                        id: randomUUID(),
                        title: 'New album',
                        order: nextOrder,
                        photos: [],
                    },
                ],
            },
        });
    }

    return (
        <div>
            <Card title="Gallery section">
                <Field
                    label="Title"
                    value={content.gallery.title}
                    onChange={(title) =>
                        onChange({ ...content, gallery: { ...content.gallery, title } })
                    }
                />
                <Field
                    label="Intro"
                    value={content.gallery.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({ ...content, gallery: { ...content.gallery, intro } })
                    }
                />
                <button
                    type="button"
                    onClick={addAlbum}
                    className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                >
                    Add album
                </button>
            </Card>

            {albums.map((album) => (
                <Card key={album.id} title={album.title}>
                    <Field
                        label="Album title"
                        value={album.title}
                        onChange={(title) => updateAlbum(album.id, (item) => ({ ...item, title }))}
                    />
                    <Field
                        label="Order"
                        value={String(album.order)}
                        onChange={(order) =>
                            updateAlbum(album.id, (item) => ({
                                ...item,
                                order: Number(order) || 0,
                            }))
                        }
                    />

                    <div className="rounded-xl border border-dashed border-stone-200 p-4">
                        <p className="mb-3 text-sm font-medium text-stone-700">Upload photo</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                const file = event.target.files?.[0];
                                if (!file) {
                                    return;
                                }
                                void onUpload(album.id, file, '')
                                    .catch((err) =>
                                        onError(err instanceof Error ? err.message : 'Upload failed'),
                                    )
                                    .finally(() => {
                                        event.target.value = '';
                                    });
                            }}
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {album.photos
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((photo) => (
                                <div
                                    key={photo.id}
                                    className="overflow-hidden rounded-xl border border-stone-100"
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.caption || album.title}
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="space-y-2 p-3">
                                        <Field
                                            label="Caption"
                                            value={photo.caption}
                                            onChange={(caption) =>
                                                updateAlbum(album.id, (item) => ({
                                                    ...item,
                                                    photos: item.photos.map((entry) =>
                                                        entry.id === photo.id
                                                            ? { ...entry, caption }
                                                            : entry,
                                                    ),
                                                }))
                                            }
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                void onDeletePhoto(album.id, photo.id).catch((err) =>
                                                    onError(
                                                        err instanceof Error
                                                            ? err.message
                                                            : 'Delete failed',
                                                    ),
                                                )
                                            }
                                            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            Delete photo
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </Card>
            ))}
        </div>
    );
}

function EventsEditor({
    content,
    onChange,
    onUploadPoster,
    onError,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
    onUploadPoster: (eventId: string, file: File) => Promise<void>;
    onError: (message: string) => void;
}) {
    function updateEvent(eventId: string, updater: (event: SiteEvent) => SiteEvent) {
        onChange({
            ...content,
            events: content.events.map((event) =>
                event.id === eventId ? updater(event) : event,
            ),
        });
    }

    function addEvent() {
        onChange({
            ...content,
            events: [
                ...content.events,
                {
                    id: randomUUID(),
                    title: 'New event',
                    subtitle: '',
                    slogan: '',
                    date: '',
                    venue: '',
                    schedule: [],
                    acronym: '',
                    acronymMeaning: '',
                    flagships: [],
                    organizers: '',
                    posterSrc: '',
                    visible: true,
                    featured: false,
                },
            ],
        });
    }

    return (
        <div>
            <Card title="Events section">
                <Field
                    label="Title"
                    value={content.eventsSection.title}
                    onChange={(title) =>
                        onChange({
                            ...content,
                            eventsSection: { ...content.eventsSection, title },
                        })
                    }
                />
                <Field
                    label="Intro"
                    value={content.eventsSection.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({
                            ...content,
                            eventsSection: { ...content.eventsSection, intro },
                        })
                    }
                />
                <button
                    type="button"
                    onClick={addEvent}
                    className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                >
                    Add event
                </button>
            </Card>

            {content.events.map((event) => (
                <Card key={event.id} title={event.title || 'Untitled event'}>
                    <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={event.visible}
                                onChange={(change) =>
                                    updateEvent(event.id, (item) => ({
                                        ...item,
                                        visible: change.target.checked,
                                    }))
                                }
                            />
                            Visible
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={event.featured}
                                onChange={(change) =>
                                    updateEvent(event.id, (item) => ({
                                        ...item,
                                        featured: change.target.checked,
                                    }))
                                }
                            />
                            Featured upcoming
                        </label>
                    </div>

                    <Field
                        label="Title"
                        value={event.title}
                        onChange={(title) => updateEvent(event.id, (item) => ({ ...item, title }))}
                    />
                    <Field
                        label="Subtitle"
                        value={event.subtitle}
                        onChange={(subtitle) =>
                            updateEvent(event.id, (item) => ({ ...item, subtitle }))
                        }
                    />
                    <Field
                        label="Slogan"
                        value={event.slogan}
                        multiline
                        onChange={(slogan) =>
                            updateEvent(event.id, (item) => ({ ...item, slogan }))
                        }
                    />
                    <Field
                        label="Date"
                        value={event.date}
                        onChange={(date) => updateEvent(event.id, (item) => ({ ...item, date }))}
                    />
                    <Field
                        label="Venue"
                        value={event.venue}
                        onChange={(venue) => updateEvent(event.id, (item) => ({ ...item, venue }))}
                    />
                    <Field
                        label="Schedule (one item per line)"
                        value={event.schedule.join('\n')}
                        multiline
                        onChange={(value) =>
                            updateEvent(event.id, (item) => ({
                                ...item,
                                schedule: value
                                    .split('\n')
                                    .map((line) => line.trim())
                                    .filter(Boolean),
                            }))
                        }
                    />
                    <Field
                        label="Acronym"
                        value={event.acronym}
                        onChange={(acronym) =>
                            updateEvent(event.id, (item) => ({ ...item, acronym }))
                        }
                    />
                    <Field
                        label="Acronym meaning"
                        value={event.acronymMeaning}
                        multiline
                        onChange={(acronymMeaning) =>
                            updateEvent(event.id, (item) => ({ ...item, acronymMeaning }))
                        }
                    />
                    <Field
                        label="Organizers"
                        value={event.organizers}
                        multiline
                        onChange={(organizers) =>
                            updateEvent(event.id, (item) => ({ ...item, organizers }))
                        }
                    />

                    <div className="rounded-xl border border-dashed border-stone-200 p-4">
                        <p className="mb-3 text-sm font-medium text-stone-700">Event poster</p>
                        {event.posterSrc ? (
                            <img
                                src={event.posterSrc}
                                alt={event.title}
                                className="mb-3 max-h-64 rounded-lg object-contain"
                            />
                        ) : null}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(change) => {
                                const file = change.target.files?.[0];
                                if (!file) {
                                    return;
                                }
                                void onUploadPoster(event.id, file)
                                    .catch((err) =>
                                        onError(
                                            err instanceof Error
                                                ? err.message
                                                : 'Poster upload failed',
                                        ),
                                    )
                                    .finally(() => {
                                        change.target.value = '';
                                    });
                            }}
                        />
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm font-medium text-stone-700">Flagship technologies</p>
                        {event.flagships.map((flagship, index) => (
                            <div
                                key={`${event.id}-flagship-${index}`}
                                className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                            >
                                <Field
                                    label="Title"
                                    value={flagship.title}
                                    onChange={(title) =>
                                        updateEvent(event.id, (item) => {
                                            const flagships = item.flagships.slice();
                                            flagships[index] = { ...flagship, title };
                                            return { ...item, flagships };
                                        })
                                    }
                                />
                                <div className="mt-3">
                                    <Field
                                        label="Description"
                                        value={flagship.description}
                                        multiline
                                        onChange={(description) =>
                                            updateEvent(event.id, (item) => {
                                                const flagships = item.flagships.slice();
                                                flagships[index] = { ...flagship, description };
                                                return { ...item, flagships };
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                updateEvent(event.id, (item) => ({
                                    ...item,
                                    flagships: [
                                        ...item.flagships,
                                        { title: 'New flagship', description: '' },
                                    ],
                                }))
                            }
                            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                        >
                            Add flagship
                        </button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
