/** @type {import('next').NextConfig} */
export const images = {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            port: '',
            pathname: '**', // Use '**' to match any path on this hostname
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '**', // Use '**' to match any path on this hostname
        },
    ],
};
  