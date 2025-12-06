/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nobulog',
  assetPrefix: '/nobulog/',
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
