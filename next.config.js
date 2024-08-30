/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["imgur.com", "zuraverse.xyz", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
