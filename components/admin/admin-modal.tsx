'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminModal({
    open,
    title,
    onClose,
    onApply,
    applyLabel = 'Apply',
    children,
    busy = false,
}: {
    open: boolean;
    title: string;
    onClose: () => void;
    onApply: () => void;
    applyLabel?: string;
    children: React.ReactNode;
    busy?: boolean;
}) {
    useEffect(() => {
        if (!open) {
            return;
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape' && !busy) {
                onClose();
            }
        }

        window.addEventListener('keydown', onKeyDown);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [open, busy, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
            <button
                type="button"
                aria-label="Close dialog"
                className="absolute inset-0 bg-stone-900/40"
                onClick={() => {
                    if (!busy) {
                        onClose();
                    }
                }}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative z-10 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl"
            >
                <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                    <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                        className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 disabled:opacity-50"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">{children}</div>
                <div className="flex justify-end gap-2 border-t border-stone-100 px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={busy}
                        className="rounded-xl border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onApply}
                        disabled={busy}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                        {busy ? 'Working…' : applyLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}
