/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '',
    trailingSlash: true,
    output: 'export',
    images: {
      unoptimized: true,
    },
  };
  
  export default nextConfig;