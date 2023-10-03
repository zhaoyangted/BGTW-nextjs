/** @type {import('next').NextConfig} */
const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
const nextConfig = {
    env: {
        apiServer : 'http://18.180.153.44',
        NEXTAUTH_SECRET : 'ted2zhao',
        NEXTAUTH_URL:'http://localhost:3000',
        S3_ACCESS_KEY:'AKIAQAVTMB3SG4XXGPIH',
        S3_SECRET_KEY:'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',
        BUCKET_NAME:'bgtwmedia',
        s3Host:'https://bgtwmedia.s3.ap-northeast-1.amazonaws.com/'
        
    },
    //trailingSlash: true,
    /* images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'bgtwmedia.s3.ap-northeast-1.amazonaws.com',
          port: '',
          pathname: '/bgtwmedia/uploads/*',
        },
      ],
    }, */
   // output: 'export',
  };
module.exports = nextConfig
    