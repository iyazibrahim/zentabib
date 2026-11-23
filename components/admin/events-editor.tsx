'use client';

import { randomUUID } from '@/lib/client-id';
import type { SiteContent, SiteEvent } from '@/lib/content/types';
import { CalendarPlus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AdminModal from './admin-modal';
import { Field, SectionCard, ToggleRow } from './fields';
import ImageDropzone from './image-dropzone';

function emptyEvent(): SiteEvent {
    return {
        id: randomUUID(),
        title: 'New event',
        date: '',
        venue: '',
        details: '',
        posterSrc: '',
        visible: true,
        featured: false,
    };
}

export default function EventsEditor({
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
    const [draft, setDraft] = useState<SiteEvent | null>(null);
    const [mode, setMode] = useState<'create' | 'edit' | null>(null);

    function openCreate() {
        setDraft(emptyEvent());
        setMode('create');
    }

    function openEdit(event: SiteEvent) {
        setDraft({ ...event });
        setMode('edit');
    }

    function closeModal() {
        setDraft(null);
        setMode(null);
    }

    function applyDraft() {
        if (!draft || !mode) {
            return;
        }

        const livePoster =
            content.events.find((event) => event.id === draft.id)?.posterSrc ?? draft.posterSrc;

        const nextEvent: SiteEvent = {
            ...draft,
            title: draft.title.trim() || 'Untitled event',
            posterSrc: livePoster,
        };

        if (mode === 'create') {
            onChange({ ...content, events: [...content.events, nextEvent] });
        } else {
            onChange({
                ...content,
                events: content.events.map((event) =>
                    event.id === nextEvent.id ? nextEvent : event,
                ),
            });
        }

        closeModal();
    }

    function deleteEvent(eventId: string) {
        if (!window.confirm('Delete this event?')) {
            return;
        }
        onChange({
            ...content,
            events: content.events.filter((event) => event.id !== eventId),
        });
    }

    return (
        <div className="space-y-6">
            <SectionCard
                title="Events"
                place="Homepage events"
                action={
                    <button
                        type="button"
                        onClick={openCreate}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        <CalendarPlus className="h-4 w-4" />
                        Add event
                    </button>
                }
            >
                <Field
                    label="Section title"
                    hint="Section heading"
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
                    hint="Under the title"
                    value={content.eventsSection.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({
                            ...content,
                            eventsSection: { ...content.eventsSection, intro },
                        })
                    }
                />
            </SectionCard>

            {content.events.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-stone-200 bg-white px-4 py-10 text-center text-sm text-stone-500">
                    No events yet — click Add event
                </p>
            ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                    {content.events.map((event) => (
                        <article
                            key={event.id}
                            className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
                                event.featured
                                    ? 'border-emerald-300 sm:col-span-2'
                                    : 'border-stone-200'
                            }`}
                        >
                            <div className="flex flex-col sm:flex-row">
                                <div
                                    className={`bg-stone-100 ${
                                        event.featured ? 'sm:w-56' : 'sm:w-36'
                                    }`}
                                >
                                    {event.posterSrc ? (
                                        <img
                                            src={event.posterSrc}
                                            alt={event.title}
                                            className="h-36 w-full object-cover sm:h-full"
                                        />
                                    ) : (
                                        <div className="flex h-36 items-center justify-center text-xs text-stone-400 sm:h-full sm:min-h-28">
                                            No poster
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col gap-3 p-4">
                                    <div>
                                        <div className="mb-1 flex flex-wrap gap-1.5">
                                            {event.visible ? (
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                                                    Visible
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone-500">
                                                    Hidden
                                                </span>
                                            )}
                                            {event.featured ? (
                                                <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                                                    Featured
                                                </span>
                                            ) : null}
                                        </div>
                                        <h4 className="font-semibold text-stone-900">
                                            {event.title || 'Untitled event'}
                                        </h4>
                                        <p className="mt-1 text-xs text-stone-500">
                                            {[event.date, event.venue].filter(Boolean).join(' · ') ||
                                                'No date / venue'}
                                        </p>
                                        {event.details ? (
                                            <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                                                {event.details}
                                            </p>
                                        ) : null}
                                    </div>
                                    <div className="mt-auto flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEdit(event)}
                                            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteEvent(event.id)}
                                            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <AdminModal
                open={Boolean(draft && mode)}
                title={mode === 'create' ? 'Add event' : 'Edit event'}
                onClose={closeModal}
                onApply={applyDraft}
            >
                {draft ? (
                    <>
                        <ToggleRow
                            label="Show on site"
                            hint="Visible"
                            checked={draft.visible}
                            onChange={(visible) => setDraft({ ...draft, visible })}
                        />
                        <ToggleRow
                            label="Featured event"
                            hint="Main upcoming"
                            checked={draft.featured}
                            onChange={(featured) => setDraft({ ...draft, featured })}
                        />
                        <Field
                            label="Title"
                            hint="Event name"
                            value={draft.title}
                            onChange={(title) => setDraft({ ...draft, title })}
                        />
                        <Field
                            label="Date"
                            hint="e.g. 14 Dec 2026"
                            value={draft.date}
                            onChange={(date) => setDraft({ ...draft, date })}
                        />
                        <Field
                            label="Venue"
                            hint="Place"
                            value={draft.venue}
                            onChange={(venue) => setDraft({ ...draft, venue })}
                        />
                        <Field
                            label="Details"
                            hint="Any event info"
                            value={draft.details}
                            multiline
                            rows={8}
                            onChange={(details) => setDraft({ ...draft, details })}
                        />
                        {mode === 'edit' ? (
                            <ImageDropzone
                                label="Drop poster here"
                                previewSrc={
                                    content.events.find((event) => event.id === draft.id)
                                        ?.posterSrc || undefined
                                }
                                onFile={async (file) => {
                                    try {
                                        await onUploadPoster(draft.id, file);
                                    } catch (err) {
                                        onError(
                                            err instanceof Error
                                                ? err.message
                                                : 'Poster upload failed',
                                        );
                                        throw err;
                                    }
                                }}
                            />
                        ) : (
                            <p className="rounded-xl border border-dashed border-stone-200 px-3 py-3 text-xs text-stone-500">
                                Save the event first, then edit it to upload a poster.
                            </p>
                        )}
                    </>
                ) : null}
            </AdminModal>
        </div>
    );
}
