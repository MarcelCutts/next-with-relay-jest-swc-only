/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    relay: {
      // This should match relay.config.js
      src: "./",
      artifactDirectory: "./__generated__",
      language: "typescript",
    },
  },
};

module.exports = nextConfig;
