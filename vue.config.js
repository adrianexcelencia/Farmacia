const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    index:{
      entry:'src/main.js',
      title:'Sistema de consumo de medicamentos',
    }
  },
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/movimed/' // prod
    : '/', // dev
})
