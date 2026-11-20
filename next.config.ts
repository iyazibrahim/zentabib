import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: '/ai-diagnose-system',
                destination: '/services/ai-health-screening',
                permanent: true,
            },
            {
                source: '/zenlive',
                destination: '/services/real-time-health-monitoring',
                permanent: true,
            },
            {
                source: '/clinical-services',
                destination: '/services/real-time-health-monitoring',
                permanent: true,
            },
            {
                source: '/medical-devices',
                destination: '/services/cardiopulmonary-image-diagnostic',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
