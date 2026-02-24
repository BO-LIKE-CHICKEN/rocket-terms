/** @type {import('next').NextConfig} */
const basePathEnv = process.env.NEXT_BASE_PATH ?? '';
const normalizedBasePath =
  basePathEnv === '' || basePathEnv === '/'
    ? ''
    : basePathEnv.startsWith('/')
      ? basePathEnv
      : `/${basePathEnv}`;

const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  ...(normalizedBasePath
    ? {
        basePath: normalizedBasePath,
        assetPrefix: normalizedBasePath,
      }
    : {}),
};

export default config;
