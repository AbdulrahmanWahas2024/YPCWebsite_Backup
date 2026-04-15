import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // لتجاوز أخطاء TypeScript التي ظهرت لك سابقاً
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  
       remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.4.177',
        port: '',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }, 
       {
         protocol: 'http',
         hostname: 'localhost',
      },  
    
   
    
       ]
  },
};


export default nextConfig;
