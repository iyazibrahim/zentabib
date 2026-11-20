'use client';

import type { SiteContent } from '@/lib/content/types';
import { Field, SectionCard, ToggleRow } from './fields';
import ImageDropzone from './image-dropzone';
import { useState } from 'react';

type SitePanel =
    | 'seo'
    | 'logo'
    | 'hero'
    | 'about'
    | 'philosophy'
    | 'contact'
    | 'footer'
    | 'sections';

const panels: { id: SitePanel; label: string }[] = [
    { id: 'seo', label: 'SEO' },
    { id: 'logo', label: 'Logo' },
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' },
    { id: 'sections', label: 'Page sections' },
];

export default function SiteEditor({
    content,
    onChange,
    onLogoUpload,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
    onLogoUpload: (file: File) => Promise<void>;
}) {
    const [panel, setPanel] = useState<SitePanel>('seo');

    return (
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-3 shadow-sm">
                <p className="mb-2 px-2 text-xs font-semibold tracking-wide text-stone-500 uppercase">
                    Site
                </p>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                    {panels.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setPanel(item.id)}
                            className={`rounded-xl px-3 py-2 text-left text-sm font-medium ${
                                panel === item.id
                                    ? 'bg-emerald-600 text-white'
                                    : 'text-stone-700 hover:bg-stone-50'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </aside>

            <div>
                {panel === 'seo' ? (
                    <SectionCard title="SEO" place="Browser tab">
                        <Field
                            label="Title"
                            hint="Browser tab title"
                            value={content.seo.title}
                            onChange={(title) =>
                                onChange({ ...content, seo: { ...content.seo, title } })
                            }
                        />
                        <Field
                            label="Description"
                            hint="Search snippet"
                            value={content.seo.description}
                            multiline
                            onChange={(description) =>
                                onChange({ ...content, seo: { ...content.seo, description } })
                            }
                        />
                    </SectionCard>
                ) : null}

                {panel === 'logo' ? (
                    <SectionCard title="Logo" place="Header & footer">
                        <ImageDropzone
                            label="Drop logo here"
                            previewSrc={content.brand.logoSrc}
                            onFile={onLogoUpload}
                        />
                    </SectionCard>
                ) : null}

                {panel === 'hero' ? (
                    <SectionCard title="Hero" place="Homepage top">
                        <Field
                            label="Badge"
                            hint="Top green pill"
                            value={content.hero.badge}
                            onChange={(badge) =>
                                onChange({ ...content, hero: { ...content.hero, badge } })
                            }
                        />
                        <Field
                            label="Headline lead"
                            hint="Main black title"
                            value={content.hero.headlineLead}
                            onChange={(headlineLead) =>
                                onChange({ ...content, hero: { ...content.hero, headlineLead } })
                            }
                        />
                        <Field
                            label="Headline accent"
                            hint="Green title line"
                            value={content.hero.headlineAccent}
                            onChange={(headlineAccent) =>
                                onChange({ ...content, hero: { ...content.hero, headlineAccent } })
                            }
                        />
                        <Field
                            label="Subheadline"
                            hint="Under the title"
                            value={content.hero.subheadline}
                            multiline
                            onChange={(subheadline) =>
                                onChange({ ...content, hero: { ...content.hero, subheadline } })
                            }
                        />
                        <Field
                            label="Primary button"
                            hint="Green button"
                            value={content.hero.primaryCta}
                            onChange={(primaryCta) =>
                                onChange({ ...content, hero: { ...content.hero, primaryCta } })
                            }
                        />
                        <Field
                            label="Secondary button"
                            hint="Outline button"
                            value={content.hero.secondaryCta}
                            onChange={(secondaryCta) =>
                                onChange({ ...content, hero: { ...content.hero, secondaryCta } })
                            }
                        />
                    </SectionCard>
                ) : null}

                {panel === 'about' ? (
                    <SectionCard title="About" place="About section">
                        <Field
                            label="Title"
                            hint="Section heading"
                            value={content.about.title}
                            onChange={(title) =>
                                onChange({ ...content, about: { ...content.about, title } })
                            }
                        />
                        <Field
                            label="Body"
                            hint="Main paragraph"
                            value={content.about.body}
                            multiline
                            rows={6}
                            onChange={(body) =>
                                onChange({ ...content, about: { ...content.about, body } })
                            }
                        />
                    </SectionCard>
                ) : null}

                {panel === 'philosophy' ? (
                    <SectionCard title="Philosophy" place="Four cards">
                        <Field
                            label="Section title"
                            hint="Above the cards"
                            value={content.philosophy.title}
                            onChange={(title) =>
                                onChange({
                                    ...content,
                                    philosophy: { ...content.philosophy, title },
                                })
                            }
                        />
                        {content.philosophy.cards.map((card, index) => (
                            <div
                                key={card.id}
                                className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                            >
                                <Field
                                    label="Card title"
                                    hint="e.g. Fast"
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
                                        hint="Card text"
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
                    </SectionCard>
                ) : null}

                {panel === 'contact' ? (
                    <SectionCard title="Contact" place="Contact section">
                        <Field
                            label="Title"
                            hint="Section heading"
                            value={content.contact.title}
                            onChange={(title) =>
                                onChange({ ...content, contact: { ...content.contact, title } })
                            }
                        />
                        <Field
                            label="Intro"
                            hint="Under the title"
                            value={content.contact.intro}
                            multiline
                            onChange={(intro) =>
                                onChange({ ...content, contact: { ...content.contact, intro } })
                            }
                        />
                        <Field
                            label="WhatsApp label"
                            hint="Shown number"
                            value={content.contact.whatsappLabel}
                            onChange={(whatsappLabel) =>
                                onChange({
                                    ...content,
                                    contact: { ...content.contact, whatsappLabel },
                                })
                            }
                        />
                        <Field
                            label="WhatsApp link"
                            hint="Click target"
                            value={content.contact.whatsappUrl}
                            onChange={(whatsappUrl) =>
                                onChange({
                                    ...content,
                                    contact: { ...content.contact, whatsappUrl },
                                })
                            }
                        />
                        <Field
                            label="Email"
                            hint="Contact email"
                            value={content.contact.email}
                            onChange={(email) =>
                                onChange({ ...content, contact: { ...content.contact, email } })
                            }
                        />
                        <Field
                            label="Address"
                            hint="Visit us"
                            value={content.contact.address}
                            multiline
                            onChange={(address) =>
                                onChange({ ...content, contact: { ...content.contact, address } })
                            }
                        />
                    </SectionCard>
                ) : null}

                {panel === 'footer' ? (
                    <SectionCard title="Footer" place="Page bottom">
                        <Field
                            label="Tagline"
                            hint="Footer line"
                            value={content.footer.tagline}
                            multiline
                            onChange={(tagline) =>
                                onChange({ ...content, footer: { ...content.footer, tagline } })
                            }
                        />
                        <Field
                            label="Copyright name"
                            hint="© company name"
                            value={content.footer.copyrightName}
                            onChange={(copyrightName) =>
                                onChange({
                                    ...content,
                                    footer: { ...content.footer, copyrightName },
                                })
                            }
                        />
                    </SectionCard>
                ) : null}

                {panel === 'sections' ? (
                    <SectionCard title="Page sections" place="Show or hide blocks">
                        {(
                            [
                                ['hero', 'Hero'],
                                ['about', 'About'],
                                ['philosophy', 'Philosophy'],
                                ['services', 'Services'],
                                ['gallery', 'Gallery'],
                                ['events', 'Events'],
                                ['contact', 'Contact'],
                                ['footer', 'Footer'],
                            ] as const
                        ).map(([key, label]) => (
                            <ToggleRow
                                key={key}
                                label={label}
                                hint="On homepage"
                                checked={content.sections[key]}
                                onChange={(checked) =>
                                    onChange({
                                        ...content,
                                        sections: { ...content.sections, [key]: checked },
                                    })
                                }
                            />
                        ))}
                    </SectionCard>
                ) : null}
            </div>
        </div>
    );
}
