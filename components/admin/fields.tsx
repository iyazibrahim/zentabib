export function Field({
    label,
    hint,
    value,
    onChange,
    multiline = false,
    rows = 4,
}: {
    label: string;
    hint?: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    rows?: number;
}) {
    const shared =
        'w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500';

    return (
        <label className="block space-y-1">
            <span className="text-sm font-medium text-stone-800">{label}</span>
            {hint ? <span className="block text-xs text-stone-500">{hint}</span> : null}
            {multiline ? (
                <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    rows={rows}
                    className={shared}
                />
            ) : (
                <input
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className={shared}
                />
            )}
        </label>
    );
}

export function SectionCard({
    title,
    place,
    children,
    action,
}: {
    title: string;
    place?: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}) {
    return (
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold text-stone-900">{title}</h2>
                    {place ? <p className="mt-0.5 text-xs font-medium text-emerald-700">{place}</p> : null}
                </div>
                {action}
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    );
}

export function ToggleRow({
    label,
    hint,
    checked,
    onChange,
}: {
    label: string;
    hint?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between gap-4 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3">
            <span>
                <span className="block text-sm font-medium text-stone-800">{label}</span>
                {hint ? <span className="block text-xs text-stone-500">{hint}</span> : null}
            </span>
            <input
                type="checkbox"
                checked={checked}
                onChange={(event) => onChange(event.target.checked)}
                className="h-4 w-4 accent-emerald-600"
            />
        </label>
    );
}
