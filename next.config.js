/** @type {import('next').NextConfig} */
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
const nextConfig = {
    env: {
        apiServer : 'http://localhost',
        NEXTAUTH_SECRET : 'ted2zhao',
        NEXTAUTH_URL:'http://localhost:3000/',
        S3_ACCESS_KEY:'',
        S3_SECRET_KEY:'',
        BUCKET_NAME:'',
        s3Host:'https://bgtwmedia.s3.ap-northeast-1.amazonaws.com/uploads/'
        
    },
    //trailingSlash: true,
    /* images: {
      domains: ["images.pexels.com"],
    }, */
  };
module.exports = nextConfig
    