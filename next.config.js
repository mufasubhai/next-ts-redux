const { ASSET_HOST } = process.env

// for those who using CDN
const assetPrefix = ASSET_HOST || ''

module.exports = {
  assetPrefix,
  
  webpack: (config, { dev }) => {
    config.output.publicPath = `${assetPrefix}${config.output.publicPath}`

    // config.resolve.fallback = {
      
    //   ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
    //     // by next.js will be dropped. Doesn't make much sense, but how it is
    //   fs: false, // the solution
    // };
    return config
  }
}
