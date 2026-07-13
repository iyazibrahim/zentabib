import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/clinical-services',
                destination: '/zenlive',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
