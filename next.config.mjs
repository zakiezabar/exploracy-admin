/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',  // Use 'https' as Cloudinary serves images over HTTPS
        hostname: 'res.cloudinary.com',  // The hostname of the allowed domain
        port: '',  // Optional: keep this empty unless you're using a specific port
        pathname: '/**',  // Allow all paths under the domain
      },
    ],
  },
};

export default nextConfig;
