// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ]
// })

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://172.20.5.171:9098', // Replace with your API base URL
      },
      '^/active_directory': {
        target: 'http://172.19.107.54:8080', // Replace with your API base URL

      },
    },

    // proxy: {
    //   '/api/v1': {
    //     target: 'http://172.20.5.171:9098', // API base URL for v1
    //     changeOrigin: true,
    //     pathRewrite: { '^/api/v1': '/api' }, // Optional: rewrites URL path
    //   },
    //   '/api/v2': {
    //     target: 'http://172.20.5.171:9095', // API base URL for v2
    //     changeOrigin: true,
    //     pathRewrite: { '^/api/v2': '/api' }, // Optional: rewrites URL path
    //   },
    //   '/active_directory': {
    //     target: 'http://172.19.107.54:8080', // API base URL for active directory
    //     // changeOrigin: true,
    //     // pathRewrite: { '^/active_directory': '' }, // Optional: rewrites URL path
    //   },
    // },
  },
};