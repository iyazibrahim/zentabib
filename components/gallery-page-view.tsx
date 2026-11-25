'use client';

import { GalleryFilterButton } from '@/components/gallery-carousel';
import PublicPageNav from '@/components/public-page-nav';
import SectionBackdrop from '@/components/section-backdrop';
import { ATMOSPHERES } from '@/lib/atmospheres';
import type { SiteContent } from '@/lib/content/types';
import { useMemo, useState } from 'react';

export default function GalleryPageView({
    content,
    logoSrc,
}: {
    content: SiteContent;
    logoSrc: string;
}) {
    const [activeAlbumId, setActiveAlbumId] = useState('all');

    const albums = useMemo(
        () => [...content.gallery.albums].sort((a, b) => a.order - b.order),
        [content.gallery.albums],
    );

    const photos = useMemo(() => {
        const all = albums.flatMap((album) =>
            album.photos
                .slice()
                .sort((a, b) => a.order - b.order)
                .map((photo) => ({ ...photo, albumTitle: album.title, albumId: album.id })),
        );
        if (activeAlbumId === 'all') {
            return all;
        }
        return all.filter((photo) => photo.albumId === activeAlbumId);
    }, [activeAlbumId, albums]);

    return (
        <div className="min-h-screen bg-stone-100 font-sans text-stone-800">
            <PublicPageNav logoSrc={logoSrc} />

            <section className="relative overflow-hidden bg-stone-200 pt-28 pb-20">
                <SectionBackdrop
                    src={ATMOSPHERES.gallery}
                    className="bg-stone-200"
                    overlayClassName="bg-white/85"
                />
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <h1 className="text-3xl font-bold text-stone-900 md:text-4xl">
                            {content.gallery.title}
                        </h1>
                        {content.gallery.intro ? (
                            <p className="mx-auto mt-3 max-w-2xl text-lg text-stone-700">
                                {content.gallery.intro}
                            </p>
                        ) : null}
                    </div>

                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        <GalleryFilterButton
                            active={activeAlbumId === 'all'}
                            onClick={() => setActiveAlbumId('all')}
                        >
                            All
                        </GalleryFilterButton>
                        {albums.map((album) => (
                            <GalleryFilterButton
                                key={album.id}
                                active={activeAlbumId === album.id}
                                onClick={() => setActiveAlbumId(album.id)}
                            >
                                {album.title}
                            </GalleryFilterButton>
                        ))}
                    </div>

                    {photos.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                            <p className="text-stone-600">No photos yet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {photos.map((photo) => (
                                <figure
                                    key={photo.id}
                                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.caption || photo.albumTitle}
                                        className="h-56 w-full object-cover"
                                    />
                                    <figcaption className="space-y-1 p-4">
                                        <p className="text-sm font-semibold text-emerald-700">
                                            {photo.albumTitle}
                                        </p>
                                        {photo.caption ? (
                                            <p className="text-sm text-stone-600">{photo.caption}</p>
                                        ) : null}
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
