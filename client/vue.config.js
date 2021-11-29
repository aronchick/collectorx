// vue.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    'proxy': "http://127.0.0.1"
  }
}