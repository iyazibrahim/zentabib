'use client';

import { randomUUID } from '@/lib/client-id';
import type { GalleryAlbum, GalleryPhoto, SiteContent } from '@/lib/content/types';
import { ArrowLeft, FolderPlus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AdminModal from './admin-modal';
import { Field, SectionCard } from './fields';
import ImageDropzone from './image-dropzone';

type AlbumDraft = {
    id: string;
    title: string;
    order: number;
};

type PhotoDraft = {
    id: string;
    caption: string;
};

export default function GalleryEditor({
    content,
    onChange,
    onUpload,
    onDeletePhoto,
    onError,
}: {
    content: SiteContent;
    onChange: (content: SiteContent) => void;
    onUpload: (albumId: string, file: File, caption: string) => Promise<void>;
    onDeletePhoto: (albumId: string, photoId: string) => Promise<void>;
    onError: (message: string) => void;
}) {
    const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
    const [albumDraft, setAlbumDraft] = useState<AlbumDraft | null>(null);
    const [albumMode, setAlbumMode] = useState<'create' | 'edit' | null>(null);
    const [photoDraft, setPhotoDraft] = useState<PhotoDraft | null>(null);

    const albums = [...content.gallery.albums].sort((a, b) => a.order - b.order);
    const openAlbum = albums.find((album) => album.id === openAlbumId) ?? null;

    function updateAlbums(albumsNext: GalleryAlbum[]) {
        onChange({
            ...content,
            gallery: { ...content.gallery, albums: albumsNext },
        });
    }

    function updateAlbum(albumId: string, updater: (album: GalleryAlbum) => GalleryAlbum) {
        updateAlbums(
            content.gallery.albums.map((album) =>
                album.id === albumId ? updater(album) : album,
            ),
        );
    }

    function openCreateAlbum() {
        const nextOrder =
            content.gallery.albums.reduce((max, album) => Math.max(max, album.order), 0) + 1;
        setAlbumDraft({
            id: randomUUID(),
            title: 'New album',
            order: nextOrder,
        });
        setAlbumMode('create');
    }

    function openEditAlbum(album: GalleryAlbum) {
        setAlbumDraft({
            id: album.id,
            title: album.title,
            order: album.order,
        });
        setAlbumMode('edit');
    }

    function closeAlbumModal() {
        setAlbumDraft(null);
        setAlbumMode(null);
    }

    function applyAlbumDraft() {
        if (!albumDraft || !albumMode) {
            return;
        }

        const title = albumDraft.title.trim() || 'Untitled album';

        if (albumMode === 'create') {
            updateAlbums([
                ...content.gallery.albums,
                {
                    id: albumDraft.id,
                    title,
                    order: albumDraft.order,
                    photos: [],
                },
            ]);
            setOpenAlbumId(albumDraft.id);
        } else {
            updateAlbum(albumDraft.id, (item) => ({
                ...item,
                title,
                order: albumDraft.order,
            }));
        }

        closeAlbumModal();
    }

    function deleteAlbum(albumId: string) {
        if (!window.confirm('Delete this album?')) {
            return;
        }
        updateAlbums(content.gallery.albums.filter((album) => album.id !== albumId));
        if (openAlbumId === albumId) {
            setOpenAlbumId(null);
        }
    }

    function openEditPhoto(photo: GalleryPhoto) {
        setPhotoDraft({ id: photo.id, caption: photo.caption });
    }

    function closePhotoModal() {
        setPhotoDraft(null);
    }

    function applyPhotoDraft() {
        if (!photoDraft || !openAlbum) {
            return;
        }

        updateAlbum(openAlbum.id, (item) => ({
            ...item,
            photos: item.photos.map((entry) =>
                entry.id === photoDraft.id
                    ? { ...entry, caption: photoDraft.caption }
                    : entry,
            ),
        }));
        closePhotoModal();
    }

    if (openAlbum) {
        const photos = openAlbum.photos.slice().sort((a, b) => a.order - b.order);

        return (
            <div className="space-y-6">
                <button
                    type="button"
                    onClick={() => setOpenAlbumId(null)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to albums
                </button>

                <SectionCard
                    title={openAlbum.title || 'Album'}
                    place="Album photos"
                    action={
                        <button
                            type="button"
                            onClick={() => openEditAlbum(openAlbum)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                        >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit album
                        </button>
                    }
                >
                    <ImageDropzone
                        label="Drop photos here"
                        onFile={async (file) => {
                            try {
                                await onUpload(openAlbum.id, file, '');
                            } catch (err) {
                                onError(err instanceof Error ? err.message : 'Upload failed');
                                throw err;
                            }
                        }}
                    />

                    {photos.length === 0 ? (
                        <p className="rounded-xl border border-dashed border-stone-200 px-4 py-8 text-center text-sm text-stone-500">
                            No photos yet
                        </p>
                    ) : (
                        <div className="grid gap-3 sm:grid-cols-2">
                            {photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    className="overflow-hidden rounded-xl border border-stone-100"
                                >
                                    <img
                                        src={photo.src}
                                        alt={photo.caption || openAlbum.title}
                                        className="h-40 w-full object-cover"
                                    />
                                    <div className="space-y-2 p-3">
                                        <p className="line-clamp-2 text-sm text-stone-600">
                                            {photo.caption || 'No caption'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                onClick={() => openEditPhoto(photo)}
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                                Edit caption
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    void onDeletePhoto(openAlbum.id, photo.id).catch(
                                                        (err) =>
                                                            onError(
                                                                err instanceof Error
                                                                    ? err.message
                                                                    : 'Delete failed',
                                                            ),
                                                    )
                                                }
                                                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>

                <AdminModal
                    open={Boolean(albumDraft && albumMode)}
                    title="Edit album"
                    onClose={closeAlbumModal}
                    onApply={applyAlbumDraft}
                >
                    {albumDraft ? (
                        <>
                            <Field
                                label="Album title"
                                hint="Filter name"
                                value={albumDraft.title}
                                onChange={(title) => setAlbumDraft({ ...albumDraft, title })}
                            />
                            <Field
                                label="Order"
                                hint="List position"
                                value={String(albumDraft.order)}
                                onChange={(order) =>
                                    setAlbumDraft({
                                        ...albumDraft,
                                        order: Number(order) || 0,
                                    })
                                }
                            />
                        </>
                    ) : null}
                </AdminModal>

                <AdminModal
                    open={Boolean(photoDraft)}
                    title="Edit caption"
                    onClose={closePhotoModal}
                    onApply={applyPhotoDraft}
                >
                    {photoDraft ? (
                        <Field
                            label="Caption"
                            hint="Under the photo"
                            value={photoDraft.caption}
                            multiline
                            onChange={(caption) => setPhotoDraft({ ...photoDraft, caption })}
                        />
                    ) : null}
                </AdminModal>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <SectionCard
                title="Gallery"
                place="Homepage gallery"
                action={
                    <button
                        type="button"
                        onClick={openCreateAlbum}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        <FolderPlus className="h-4 w-4" />
                        Add album
                    </button>
                }
            >
                <Field
                    label="Title"
                    hint="Section heading"
                    value={content.gallery.title}
                    onChange={(title) =>
                        onChange({ ...content, gallery: { ...content.gallery, title } })
                    }
                />
                <Field
                    label="Intro"
                    hint="Under the title"
                    value={content.gallery.intro}
                    multiline
                    onChange={(intro) =>
                        onChange({ ...content, gallery: { ...content.gallery, intro } })
                    }
                />
            </SectionCard>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-stone-700">Albums</h3>
                {albums.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-stone-200 bg-white px-4 py-10 text-center text-sm text-stone-500">
                        No albums yet — click Add album
                    </p>
                ) : (
                    albums.map((album) => (
                        <div
                            key={album.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 shadow-sm"
                        >
                            <div>
                                <p className="font-semibold text-stone-900">{album.title}</p>
                                <p className="text-xs text-stone-500">
                                    {album.photos.length} photo
                                    {album.photos.length === 1 ? '' : 's'} · order {album.order}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => setOpenAlbumId(album.id)}
                                    className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                                >
                                    Open
                                </button>
                                <button
                                    type="button"
                                    onClick={() => openEditAlbum(album)}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
                                >
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => deleteAlbum(album.id)}
                                    className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <AdminModal
                open={Boolean(albumDraft && albumMode)}
                title={albumMode === 'create' ? 'Add album' : 'Edit album'}
                onClose={closeAlbumModal}
                onApply={applyAlbumDraft}
            >
                {albumDraft ? (
                    <>
                        <Field
                            label="Album title"
                            hint="Filter name"
                            value={albumDraft.title}
                            onChange={(title) => setAlbumDraft({ ...albumDraft, title })}
                        />
                        <Field
                            label="Order"
                            hint="List position"
                            value={String(albumDraft.order)}
                            onChange={(order) =>
                                setAlbumDraft({
                                    ...albumDraft,
                                    order: Number(order) || 0,
                                })
                            }
                        />
                    </>
                ) : null}
            </AdminModal>
        </div>
    );
}
