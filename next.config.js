const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')
  module.exports = (phase) => {
    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    // when `next build` or `npm run build` is used
    const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
    // when `next build` or `npm run build` is used
    const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
  
    console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)
  
    const env = {
      apiServer : 'http://localhost',
      NEXTAUTH_SECRET : 'ted2zhao',
      NEXTAUTH_URL:'http://localhost:3000',
      S3_ACCESS_KEY:'',
      S3_SECRET_KEY:'',
      BUCKET_NAME:'',
      s3Host:'https://bgtwmedia.s3.ap-northeast-1.amazonaws.com/uploads/',
      RESTURL_SPEAKERS: (() => {
        if (isDev) return 'http://localhost:4000/speakers'
        if (isProd) {
          return 'https://www.siliconvalley-codecamp.com/rest/speakers/ps'
        }
        if (isStaging) return 'http://localhost:11639'
        return 'RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
      RESTURL_SESSIONS: (() => {
        if (isDev) return 'http://localhost:4000/sessions'
        if (isProd) return 'https://www.siliconvalley-codecamp.com/rest/sessions'
        if (isStaging) return 'http://localhost:11639'
        return 'RESTURL_SESSIONS:not (isDev,isProd && !isStaging,isProd && isStaging)'
      })(),
    }
  
    // next.config.js object
    return {
      env,
    }
  }