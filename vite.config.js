const { defineConfig } = require('vite')
const { resolve } = require('path')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        test2: resolve(__dirname, 'src/exp/test2/index.html')
      },
    }
  },
})
