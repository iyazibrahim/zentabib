'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type GalleryCarouselPhoto = {
    id: string;
    src: string;
    caption: string;
    albumTitle: string;
};

function useVisibleCount() {
    const [count, setCount] = useState(1);

    useEffect(() => {
        function update() {
            const width = window.innerWidth;
            if (width >= 1024) {
                setCount(4);
            } else if (width >= 640) {
                setCount(2);
            } else {
                setCount(1);
            }
        }

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return count;
}

export default function GalleryCarousel({ photos }: { photos: GalleryCarouselPhoto[] }) {
    const visibleCount = useVisibleCount();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const maxIndex = Math.max(0, photos.length - visibleCount);
    const safeIndex = Math.min(index, maxIndex);

    useEffect(() => {
        if (photos.length <= visibleCount || paused) {
            return;
        }

        const timer = window.setInterval(() => {
            setIndex((current) => {
                const next = Math.min(current, maxIndex);
                return next >= maxIndex ? 0 : next + 1;
            });
        }, 4500);

        return () => window.clearInterval(timer);
    }, [photos.length, visibleCount, maxIndex, paused]);

    if (photos.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
                <p className="text-stone-600">No photos yet</p>
            </div>
        );
    }

    function goPrev() {
        setIndex(safeIndex <= 0 ? maxIndex : safeIndex - 1);
    }

    function goNext() {
        setIndex(safeIndex >= maxIndex ? 0 : safeIndex + 1);
    }

    return (
        <div
            className="relative px-2 sm:px-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${safeIndex * (100 / visibleCount)}%)`,
                    }}
                >
                    {photos.map((photo) => (
                        <figure
                            key={photo.id}
                            className="box-border shrink-0 px-2"
                            style={{ width: `${100 / visibleCount}%` }}
                        >
                            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
                                <img
                                    src={photo.src}
                                    alt={photo.caption || photo.albumTitle}
                                    className="h-52 w-full object-cover sm:h-56"
                                />
                                <figcaption className="space-y-1 p-4">
                                    <p className="text-sm font-semibold text-emerald-700">
                                        {photo.albumTitle}
                                    </p>
                                    {photo.caption ? (
                                        <p className="line-clamp-2 text-sm text-stone-600">
                                            {photo.caption}
                                        </p>
                                    ) : null}
                                </figcaption>
                            </div>
                        </figure>
                    ))}
                </div>
            </div>

            {photos.length > visibleCount ? (
                <>
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous photos"
                        className="absolute top-[42%] left-0 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-stone-500 bg-white text-stone-900 shadow-md transition-colors hover:border-emerald-600 hover:bg-emerald-50"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next photos"
                        className="absolute top-[42%] right-0 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-stone-500 bg-white text-stone-900 shadow-md transition-colors hover:border-emerald-600 hover:bg-emerald-50"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </>
            ) : null}
        </div>
    );
}

export function GalleryFilterButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full border-2 px-4 py-2.5 text-sm font-semibold shadow-sm transition-colors ${
                active
                    ? 'border-emerald-700 bg-emerald-700 text-white'
                    : 'border-stone-500 bg-white text-stone-900 hover:border-emerald-600 hover:bg-emerald-50'
            }`}
        >
            {children}
        </button>
    );
}
