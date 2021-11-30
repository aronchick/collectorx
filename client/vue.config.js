// vue.config.js
module.exports = {
  devServer: {
    disableHostCheck: true,   // That solved it
    overlay: {
      warnings: true,
      errors: true
    },
    'proxy': "http://127.0.0.1"
  },
  productionSourceMap: true,
}