'use client';

import { ImagePlus, LoaderCircle, Upload } from 'lucide-react';
import { useRef, useState } from 'react';

type ImageDropzoneProps = {
    onFile: (file: File) => Promise<void> | void;
    label?: string;
    hint?: string;
    previewSrc?: string;
    disabled?: boolean;
};

export default function ImageDropzone({
    onFile,
    label = 'Drop image here',
    hint = 'JPG, PNG, WEBP, GIF · max 8MB',
    previewSrc,
    disabled = false,
}: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    async function handleFile(file: File | undefined) {
        if (!file || disabled) {
            return;
        }

        setError('');
        setUploading(true);
        try {
            await onFile(file);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="space-y-3">
            <div
                onDragEnter={(event) => {
                    event.preventDefault();
                    if (!disabled) {
                        setDragging(true);
                    }
                }}
                onDragOver={(event) => {
                    event.preventDefault();
                    if (!disabled) {
                        setDragging(true);
                    }
                }}
                onDragLeave={(event) => {
                    event.preventDefault();
                    setDragging(false);
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    setDragging(false);
                    void handleFile(event.dataTransfer.files?.[0]);
                }}
                className={`rounded-2xl border-2 border-dashed p-6 text-center transition-colors ${
                    dragging
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-stone-200 bg-stone-50'
                } ${disabled || uploading ? 'opacity-70' : ''}`}
            >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                    {uploading ? (
                        <LoaderCircle className="h-6 w-6 animate-spin" />
                    ) : (
                        <ImagePlus className="h-6 w-6" />
                    )}
                </div>
                <p className="text-sm font-semibold text-stone-800">
                    {uploading ? 'Uploading…' : label}
                </p>
                <p className="mt-1 text-xs text-stone-500">{hint}</p>
                <button
                    type="button"
                    disabled={disabled || uploading}
                    onClick={() => inputRef.current?.click()}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                >
                    <Upload className="h-4 w-4" />
                    Browse
                </button>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(event) => {
                        const file = event.target.files?.[0];
                        event.target.value = '';
                        void handleFile(file);
                    }}
                />
            </div>

            {previewSrc ? (
                <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                    <img src={previewSrc} alt="Preview" className="max-h-56 w-full object-contain p-3" />
                </div>
            ) : null}

            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
}
