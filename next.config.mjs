// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    //skal slettes for at køre
    /*experimental: {
      appDir: true,
    },*/
    webpack: (config) => {
      return config;
    },
  };
  
  export default nextConfig;
  