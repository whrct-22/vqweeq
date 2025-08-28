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
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/System Volume Information/**",
          "**/System Volume Information",
          "**/$Recycle.Bin/**",
          "**/Recovery/**",
          "**/Config.Msi/**",
          "**/Windows/**",
          "**/Program Files/**",
          "**/Program Files (x86)/**",
          "**/ProgramData/**",
          "**/Users/*/AppData/**"
        ]
      };
    }
    return config;
  },
  output: 'export'
}

export default nextConfig