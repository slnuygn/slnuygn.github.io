/** @type {import('next').NextConfig} */
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''
const isUserOrOrgSite = repoName.endsWith('.github.io')
const basePath = isProd && repoName && !isUserOrOrgSite ? `/${repoName}` : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  outputFileTracingRoot: path.join(__dirname),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath || undefined,
}

module.exports = nextConfig
