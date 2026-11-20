import { Activity, Brain, ScanHeart } from 'lucide-react';
import type { Service } from './content/types';

export function ServiceIcon({
    icon,
    className = 'h-8 w-8',
}: {
    icon: Service['icon'];
    className?: string;
}) {
    switch (icon) {
        case 'screening':
            return <Brain className={className} />;
        case 'imaging':
            return <ScanHeart className={className} />;
        case 'monitoring':
            return <Activity className={className} />;
        default:
            return <Brain className={className} />;
    }
}

export const serviceIconColors: Record<Service['icon'], string> = {
    screening: 'bg-emerald-100 text-emerald-700',
    imaging: 'bg-teal-100 text-teal-700',
    monitoring: 'bg-cyan-100 text-cyan-700',
};
