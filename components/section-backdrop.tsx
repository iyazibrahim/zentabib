export default function SectionBackdrop({
    src,
    className = 'bg-[#04101f]',
    overlayClassName = 'bg-[#04101f]/75',
}: {
    src: string;
    className?: string;
    overlayClassName?: string;
}) {
    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden>
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className={`absolute inset-0 ${overlayClassName}`} />
        </div>
    );
}
