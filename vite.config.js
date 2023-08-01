import { resolve } from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    root: 'src',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                test: resolve(__dirname, 'src/exp/boi/index.html'),
            },
        },
    },
    plugins: [
        glsl()
    ],
})
