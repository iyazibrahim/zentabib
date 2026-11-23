'use client';

import WelcomePage from '@/components/welcome-page';
import type { SiteContent } from '@/lib/content/types';
import { useEffect, useRef, useState } from 'react';

const TAB_SECTION: Record<string, string> = {
    site: 'home',
    services: 'services',
    gallery: 'gallery',
    events: 'events',
};

const PREVIEW_WIDTH = 1280;
const SCALE = 0.42;

export default function LiveSitePreview({
    content,
    focusTab,
}: {
    content: SiteContent;
    focusTab?: string;
}) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const [frameHeight, setFrameHeight] = useState(2400);

    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) {
            return;
        }

        const updateHeight = () => {
            setFrameHeight(Math.max(frame.scrollHeight, 1200));
        };

        updateHeight();
        const observer = new ResizeObserver(updateHeight);
        observer.observe(frame);
        return () => observer.disconnect();
    }, [content]);

    useEffect(() => {
        const sectionId = focusTab ? TAB_SECTION[focusTab] : 'home';
        if (!sectionId || !frameRef.current || !scrollRef.current) {
            return;
        }

        const target = frameRef.current.querySelector(`#${sectionId}`);
        if (!(target instanceof HTMLElement)) {
            scrollRef.current.scrollTop = 0;
            return;
        }

        scrollRef.current.scrollTo({
            top: Math.max(0, target.offsetTop * SCALE - 24),
            behavior: 'smooth',
        });
    }, [focusTab]);

    return (
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 shadow-sm">
            <div className="flex items-center gap-2 border-b border-stone-300 bg-stone-100 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 truncate text-xs font-medium text-stone-500">
                    Live preview · unsaved edits included
                </span>
            </div>
            <div ref={scrollRef} className="min-h-0 flex-1 overflow-auto bg-stone-300/60 p-3">
                <div
                    className="mx-auto overflow-hidden rounded-lg bg-white shadow-md"
                    style={{
                        width: PREVIEW_WIDTH * SCALE,
                        height: frameHeight * SCALE,
                    }}
                >
                    <div
                        ref={frameRef}
                        className="pointer-events-none origin-top-left"
                        style={{
                            width: PREVIEW_WIDTH,
                            transform: `scale(${SCALE})`,
                        }}
                    >
                        <WelcomePage content={content} />
                    </div>
                </div>
            </div>
        </div>
    );
}
