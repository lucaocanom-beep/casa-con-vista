/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/guida",
        destination: "/guida-casa-con-vista-porto-recanati.html",
      },
    ];
  },
};

export default nextConfig;
