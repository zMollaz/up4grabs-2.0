require('dotenv').config()

module.exports = {
  reactStrictMode: true,
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        crypto: false,
      }
      
      config.experiments.topLevelAwait = true
      
      return config;
    },
}
