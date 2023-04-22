/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: 'http://localhost:5000',
    BASE_PATH_CLINIC:'/api/v1/clinic',
    BASE_PATH_PATIENT: '/api/v1/patient'
  },
}

module.exports = nextConfig
