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
    },
  },
};