export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden rounded-md bg-white">
                <img src="/zen-ai-logo.png" alt="Zen AI" className="h-full w-full object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Zen AI
                </span>
            </div>
        </>
    );
}
