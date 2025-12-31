// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config

  async redirects() {
    return [
      // 308 Permanent Redirect (permanent: true)
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      {
        source: '/legacy-page',
        destination: '/new-page',
        permanent: true,
      },

      // Example: redirect a whole section
      // {
      //   source: '/old-section/:path*',
      //   destination: '/new-section/:path*',
      //   permanent: true,
      // },
    ];
  },
};

export default nextConfig;
