/** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     domains: ["lh3.googleusercontent.com"]
//   }
// }

module.exports = {
   webpack: config => {
      config.resolve.preferRelative = true
      return config
   },
   experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"]
  }
}