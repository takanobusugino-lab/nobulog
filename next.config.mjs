/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nobulog',
  assetPrefix: '/nobulog',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
