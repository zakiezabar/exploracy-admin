/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add res.cloudinary.com to the list of allowed domains
    domains: ['res.cloudinary.com'],
  },
};

export default nextConfig;
