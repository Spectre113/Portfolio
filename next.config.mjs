/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/Spectre113.github.io' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Spectre113.github.io/' : '',
    trailingSlash: true,
  };
  
  export default nextConfig;
