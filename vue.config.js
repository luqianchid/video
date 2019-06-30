var webpack = require('webpack')

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production' ? 'error' : false,
  devServer: {
    overlay: {
      error: true
    },
    clientLogLevel: 'warning',
    port: 8100,
    hot: true,
    proxy: { // 配置多个代理
      '/api': {
        target: 'http://localhost:8080/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/v1': '/'
        }
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        data: `@import "@/assets/css/color.scss";`
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        _: 'lodash'
      })
    ]
  }
}
