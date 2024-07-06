/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/username.github.io' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/username.github.io/' : '',
    trailingSlash: true,
  };
  
  export default nextConfig;
