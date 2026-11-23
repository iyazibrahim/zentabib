'use client';

import type { Service, SiteContent } from '@/lib/content/types';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AdminModal from './admin-modal';
import { Field, SectionCard } from './fields';

const ICON_OPTIONS: Service['icon'][] = ['screening', 'imaging', 'monitoring'];

function slugify(value: string) {
    const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return slug || 'service';
}

function uniqueSlug(base: string, services: Service[], excludeSlug?: string) {
    const root = slugify(base);
    const taken = new Set(
        services.map((service) => service.slug).filter((slug) => slug !== excludeSlug),
    );
    if (!taken.has(root)) {
        return root;
    }
    let index = 2;
    while (taken.has(`${root}-${index}`)) {
        index += 1;
    }
    return `${root}-${index}`;
}

function emptyService(services: Service[]): Service {
    return {
        slug: uniqueSlug('new-service', services),
        title: 'New service',
        summary: '',
        description: '',
        bullets: [
            { label: 'Fast', text: '' },
            { label: 'Anywhere', text: '' },
            { label: 'Affordable & Creative', text: '' },
        ],
        icon: 'screening',
    };
}

export default function ServicesEditor({
    content,
    onChange,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
}) {
    const [draft, setDraft] = useState<Service | null>(null);
    const [mode, setMode] = useState<'create' | 'edit' | null>(null);
    const [editingSlug, setEditingSlug] = useState<string | null>(null);

    function openCreate() {
        setDraft(emptyService(content.services));
        setMode('create');
        setEditingSlug(null);
    }

    function openEdit(service: Service) {
        setDraft({
            ...service,
            bullets: service.bullets.map((bullet) => ({ ...bullet })),
        });
        setMode('edit');
        setEditingSlug(service.slug);
    }

    function closeModal() {
        setDraft(null);
        setMode(null);
        setEditingSlug(null);
    }

    function applyDraft() {
        if (!draft || !mode) {
            return;
        }

        const nextSlug =
            mode === 'create'
                ? uniqueSlug(draft.slug || draft.title, content.services)
                : uniqueSlug(draft.slug || draft.title, content.services, editingSlug ?? undefined);

        const nextService: Service = {
            ...draft,
            slug: nextSlug,
            title: draft.title.trim() || 'Untitled service',
        };

        if (mode === 'create') {
            onChange({ ...content, services: [...content.services, nextService] });
        } else if (editingSlug) {
            onChange({
                ...content,
                services: content.services.map((service) =>
                    service.slug === editingSlug ? nextService : service,
                ),
            });
        }

        closeModal();
    }

    function deleteService(slug: string) {
        if (!window.confirm('Delete this service?')) {
            return;
        }
        onChange({
            ...content,
            services: content.services.filter((service) => service.slug !== slug),
        });
    }

    return (
        <div className="space-y-6">
            <SectionCard title="Services intro" place="Above the cards">
                <Field
                    label="Headline"
                    hint="Section heading"
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
                    hint="Under the title"
                    value={content.servicesSection.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({
                            ...content,
                            servicesSection: { ...content.servicesSection, intro },
                        })
                    }
                />
            </SectionCard>

            <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-stone-700">Services</h3>
                <button
                    type="button"
                    onClick={openCreate}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                    <Plus className="h-4 w-4" />
                    Add service
                </button>
            </div>

            {content.services.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-stone-200 bg-white px-4 py-10 text-center text-sm text-stone-500">
                    No services yet — click Add service
                </p>
            ) : (
                <div className="grid gap-3">
                    {content.services.map((service) => (
                        <div
                            key={service.slug}
                            className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm"
                        >
                            <div className="min-w-0 flex-1">
                                <p className="font-semibold text-stone-900">{service.title}</p>
                                <p className="mt-0.5 text-xs text-stone-500">/{service.slug}</p>
                                <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                                    {service.summary || 'No summary'}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => openEdit(service)}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteService(service.slug)}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AdminModal
                open={Boolean(draft && mode)}
                title={mode === 'create' ? 'Add service' : 'Edit service'}
                onClose={closeModal}
                onApply={applyDraft}
            >
                {draft ? (
                    <>
                        <Field
                            label="Title"
                            hint="Card title"
                            value={draft.title}
                            onChange={(title) =>
                                setDraft({
                                    ...draft,
                                    title,
                                    slug:
                                        mode === 'create'
                                            ? uniqueSlug(title, content.services)
                                            : draft.slug,
                                })
                            }
                        />
                        <Field
                            label="Slug"
                            hint="URL path"
                            value={draft.slug}
                            onChange={(slug) => setDraft({ ...draft, slug })}
                        />
                        <label className="block space-y-1">
                            <span className="text-sm font-medium text-stone-800">Icon</span>
                            <span className="block text-xs text-stone-500">Card icon</span>
                            <select
                                value={draft.icon}
                                onChange={(event) =>
                                    setDraft({
                                        ...draft,
                                        icon: event.target.value as Service['icon'],
                                    })
                                }
                                className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                            >
                                {ICON_OPTIONS.map((icon) => (
                                    <option key={icon} value={icon}>
                                        {icon}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <Field
                            label="Card summary"
                            hint="Homepage card"
                            value={draft.summary}
                            multiline
                            onChange={(summary) => setDraft({ ...draft, summary })}
                        />
                        <Field
                            label="Full description"
                            hint="Detail page"
                            value={draft.description}
                            multiline
                            rows={5}
                            onChange={(description) => setDraft({ ...draft, description })}
                        />
                        {draft.bullets.map((bullet, bulletIndex) => (
                            <div
                                key={`bullet-${bulletIndex}`}
                                className="space-y-3 rounded-xl border border-stone-100 bg-stone-50 p-4"
                            >
                                <Field
                                    label="Bullet label"
                                    hint="e.g. Fast"
                                    value={bullet.label}
                                    onChange={(label) => {
                                        const bullets = draft.bullets.slice();
                                        bullets[bulletIndex] = { ...bullet, label };
                                        setDraft({ ...draft, bullets });
                                    }}
                                />
                                <Field
                                    label="Bullet text"
                                    hint="Detail point"
                                    value={bullet.text}
                                    multiline
                                    onChange={(text) => {
                                        const bullets = draft.bullets.slice();
                                        bullets[bulletIndex] = { ...bullet, text };
                                        setDraft({ ...draft, bullets });
                                    }}
                                />
                            </div>
                        ))}
                    </>
                ) : null}
            </AdminModal>
        </div>
    );
}
