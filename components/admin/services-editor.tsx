'use client';

import type { SiteContent } from '@/lib/content/types';
import { Field, SectionCard } from './fields';

export default function ServicesEditor({
    content,
    onChange,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
}) {
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

            {content.services.map((service, index) => (
                <SectionCard key={service.slug} title={service.title} place="Service page">
                    <Field
                        label="Slug"
                        hint="URL path"
                        value={service.slug}
                        onChange={(slug) => {
                            const services = content.services.slice();
                            services[index] = { ...service, slug };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Title"
                        hint="Card title"
                        value={service.title}
                        onChange={(title) => {
                            const services = content.services.slice();
                            services[index] = { ...service, title };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Card summary"
                        hint="Homepage card"
                        value={service.summary}
                        multiline
                        onChange={(summary) => {
                            const services = content.services.slice();
                            services[index] = { ...service, summary };
                            onChange({ ...content, services });
                        }}
                    />
                    <Field
                        label="Full description"
                        hint="Detail page"
                        value={service.description}
                        multiline
                        rows={5}
                        onChange={(description) => {
                            const services = content.services.slice();
                            services[index] = { ...service, description };
                            onChange({ ...content, services });
                        }}
                    />
                    {service.bullets.map((bullet, bulletIndex) => (
                        <div
                            key={`${service.slug}-${bulletIndex}`}
                            className="rounded-xl border border-stone-100 bg-stone-50 p-4"
                        >
                            <Field
                                label="Bullet label"
                                hint="e.g. Fast"
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
                                    hint="Detail point"
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
                </SectionCard>
            ))}
        </div>
    );
}
