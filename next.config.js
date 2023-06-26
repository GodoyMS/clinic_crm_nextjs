/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendURL: process.env.BACKEND_URL,
    BASE_PATH_CLINIC:'/api/v1/clinic',
    BASE_PATH_PATIENT: '/api/v1/patient'
  },
  images:{
    domains:["cdn.midjourney.com","res.cloudinary.com"]
  }
}

module.exports = nextConfig
