/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    AI_PROVIDER: process.env.AI_PROVIDER,
    },
    eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
