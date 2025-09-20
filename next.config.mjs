/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: "export", // Statik dışa aktarma
  reactStrictMode: true, // React strict modunu etkinleştir
}

export default nextConfig
