'use client';

import type { SiteContent } from '@/lib/content/types';
import {
    CalendarDays,
    Eye,
    EyeOff,
    Images,
    LayoutTemplate,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import EventsEditor from './events-editor';
import GalleryEditor from './gallery-editor';
import LiveSitePreview from './live-site-preview';
import ServicesEditor from './services-editor';
import SiteEditor from './site-editor';

type Tab = 'site' | 'services' | 'gallery' | 'events';

export default function AdminApp() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [content, setContent] = useState<SiteContent | null>(null);
    const [savedSnapshot, setSavedSnapshot] = useState('');
    const [tab, setTab] = useState<Tab>('site');
    const [previewOn, setPreviewOn] = useState(true);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const dirty = useMemo(() => {
        if (!content || !savedSnapshot) {
            return false;
        }
        return JSON.stringify(content) !== savedSnapshot;
    }, [content, savedSnapshot]);

    const showStatus = useCallback((message: string) => {
        if (statusTimer.current) {
            clearTimeout(statusTimer.current);
        }
        setStatus(message);
        statusTimer.current = setTimeout(() => setStatus(''), 3000);
    }, []);

    const loadContent = useCallback(async () => {
        const response = await fetch('/api/admin/content');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        const data = (await response.json()) as SiteContent;
        setContent(data);
        setSavedSnapshot(JSON.stringify(data));
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

    useEffect(() => {
        function onBeforeUnload(event: BeforeUnloadEvent) {
            if (!dirty) {
                return;
            }
            event.preventDefault();
            event.returnValue = '';
        }

        window.addEventListener('beforeunload', onBeforeUnload);
        return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }, [dirty]);

    useEffect(() => {
        return () => {
            if (statusTimer.current) {
                clearTimeout(statusTimer.current);
            }
        };
    }, []);

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
        showStatus('Signed in');
    }

    async function handleLogout() {
        if (dirty && !window.confirm('You have unsaved changes. Sign out anyway?')) {
            return;
        }
        await fetch('/api/admin/logout', { method: 'POST' });
        setAuthenticated(false);
        setContent(null);
        setSavedSnapshot('');
        showStatus('Signed out');
    }

    async function handleSave() {
        if (!content) {
            return;
        }

        setSaving(true);
        setError('');

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

            setSavedSnapshot(JSON.stringify(content));
            showStatus('Saved');
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
        setSavedSnapshot(JSON.stringify(payload.content));
        showStatus('Photo uploaded');
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
        setSavedSnapshot(JSON.stringify(payload.content));
        showStatus('Photo deleted');
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
        setSavedSnapshot(JSON.stringify(payload.content));
        showStatus('Poster updated');
    }

    async function handleServiceImage(slug: string, file: File) {
        const formData = new FormData();
        formData.set('slug', slug);
        formData.set('file', file);

        const response = await fetch('/api/admin/services/image', {
            method: 'POST',
            body: formData,
        });

        const payload = (await response.json()) as { error?: string; content?: SiteContent };
        if (!response.ok || !payload.content) {
            throw new Error(payload.error ?? 'Service image upload failed');
        }

        setContent(payload.content);
        setSavedSnapshot(JSON.stringify(payload.content));
        showStatus('Service image updated');
    }

    async function handleLogoUpload(file: File) {
        const formData = new FormData();
        formData.set('file', file);

        const response = await fetch('/api/admin/brand/logo', {
            method: 'POST',
            body: formData,
        });

        const payload = (await response.json()) as { error?: string; content?: SiteContent };
        if (!response.ok || !payload.content) {
            throw new Error(payload.error ?? 'Logo upload failed');
        }

        setContent(payload.content);
        setSavedSnapshot(JSON.stringify(payload.content));
        showStatus('Logo updated');
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
                    <p className="mb-6 text-sm text-stone-600">Sign in to edit the website.</p>
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
                    <Link
                        href="/"
                        className="mt-4 block text-center text-sm text-stone-500 hover:text-emerald-600"
                    >
                        Back to website
                    </Link>
                </form>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 text-stone-600">
                Loading content…
            </div>
        );
    }

    const tabs: { id: Tab; label: string; icon: typeof LayoutTemplate }[] = [
        { id: 'site', label: 'Site', icon: LayoutTemplate },
        { id: 'services', label: 'Services', icon: Sparkles },
        { id: 'gallery', label: 'Gallery', icon: Images },
        { id: 'events', label: 'Events', icon: CalendarDays },
    ];

    const editor = (
        <>
            {tab === 'site' ? (
                <SiteEditor
                    content={content}
                    onChange={setContent}
                    onLogoUpload={handleLogoUpload}
                />
            ) : null}
            {tab === 'services' ? (
                <ServicesEditor
                    content={content}
                    onChange={setContent}
                    onUploadImage={handleServiceImage}
                    onError={setError}
                />
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
        </>
    );

    return (
        <div className="min-h-screen bg-stone-100 text-stone-800">
            <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-stone-900">Website CMS</h1>
                        <p className="text-sm text-stone-500">Edit content without code</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        {dirty ? (
                            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                                Unsaved changes
                            </span>
                        ) : null}
                        <button
                            type="button"
                            onClick={() => setPreviewOn((value) => !value)}
                            className="inline-flex items-center gap-2 rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                        >
                            {previewOn ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                            {previewOn ? 'Hide preview' : 'Show preview'}
                        </button>
                        <Link
                            href="/"
                            onClick={(event) => {
                                if (
                                    dirty &&
                                    !window.confirm('You have unsaved changes. Leave anyway?')
                                ) {
                                    event.preventDefault();
                                }
                            }}
                            className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium hover:bg-stone-50"
                        >
                            View site
                        </Link>
                        <button
                            type="button"
                            onClick={() => void handleSave()}
                            disabled={saving || !dirty}
                            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:opacity-50 ${
                                dirty
                                    ? 'bg-emerald-600 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-300 hover:bg-emerald-700'
                                    : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
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

            <div className="mx-auto max-w-[1600px] px-4 py-6">
                {(status || error) && (
                    <div
                        className={`mb-4 flex items-start justify-between gap-3 rounded-xl px-4 py-3 text-sm ${
                            error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-800'
                        }`}
                    >
                        <span>{error || status}</span>
                        {error ? (
                            <button
                                type="button"
                                onClick={() => setError('')}
                                className="text-xs font-semibold underline"
                            >
                                Dismiss
                            </button>
                        ) : null}
                    </div>
                )}

                <div className="mb-6 flex flex-wrap gap-2">
                    {tabs.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setTab(item.id)}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                                    tab === item.id
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white text-stone-700 hover:bg-stone-50'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>

                <div
                    className={`grid gap-6 ${
                        previewOn ? 'lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]' : ''
                    }`}
                >
                    <div className="min-w-0">{editor}</div>
                    {previewOn ? (
                        <div className="hidden min-h-[70vh] lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-7rem)]">
                            <LiveSitePreview content={content} focusTab={tab} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
