import type { NextConfig } from "next";
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',  //'development'로 하면 개발환경에서 작동하지 않음 , 'production'은 배포환경에서 작동하지 않음
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withPWA(nextConfig);
