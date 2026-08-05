/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Prevents duplicate R3F renders in dev
  transpilePackages: ['three'],
  // Turbopack config (Next.js 16 default) - empty config silences the warning
  turbopack: {},
  // Keep webpack config for fallback compatibility
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

module.exports = nextConfig;
