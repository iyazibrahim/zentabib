'use client';

import { randomUUID } from '@/lib/client-id';
import type { SiteContent, SiteEvent } from '@/lib/content/types';
import { CalendarPlus } from 'lucide-react';
import { Field, SectionCard, ToggleRow } from './fields';
import ImageDropzone from './image-dropzone';

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
                    date: '',
                    venue: '',
                    details: '',
                    posterSrc: '',
                    visible: true,
                    featured: false,
                },
            ],
        });
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
                        onClick={addEvent}
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

            {content.events.map((event) => (
                <SectionCard key={event.id} title={event.title || 'Untitled event'} place="Event card">
                    <ToggleRow
                        label="Show on site"
                        hint="Visible"
                        checked={event.visible}
                        onChange={(visible) => updateEvent(event.id, (item) => ({ ...item, visible }))}
                    />
                    <ToggleRow
                        label="Featured event"
                        hint="Main upcoming"
                        checked={event.featured}
                        onChange={(featured) =>
                            updateEvent(event.id, (item) => ({ ...item, featured }))
                        }
                    />
                    <Field
                        label="Title"
                        hint="Event name"
                        value={event.title}
                        onChange={(title) => updateEvent(event.id, (item) => ({ ...item, title }))}
                    />
                    <Field
                        label="Date"
                        hint="e.g. 14 Dec 2026"
                        value={event.date}
                        onChange={(date) => updateEvent(event.id, (item) => ({ ...item, date }))}
                    />
                    <Field
                        label="Venue"
                        hint="Place"
                        value={event.venue}
                        onChange={(venue) => updateEvent(event.id, (item) => ({ ...item, venue }))}
                    />
                    <Field
                        label="Details"
                        hint="Any event info"
                        value={event.details}
                        multiline
                        rows={10}
                        onChange={(details) =>
                            updateEvent(event.id, (item) => ({ ...item, details }))
                        }
                    />
                    <ImageDropzone
                        label="Drop poster here"
                        previewSrc={event.posterSrc || undefined}
                        onFile={async (file) => {
                            try {
                                await onUploadPoster(event.id, file);
                            } catch (err) {
                                onError(
                                    err instanceof Error ? err.message : 'Poster upload failed',
                                );
                                throw err;
                            }
                        }}
                    />
                    <button
                        type="button"
                        onClick={() => deleteEvent(event.id)}
                        className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                        Delete event
                    </button>
                </SectionCard>
            ))}
        </div>
    );
}
