import { resolve } from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    base: '/exp/',
    plugins: [glsl()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                boi: resolve(__dirname, '_/boi.html'),
                dots: resolve(__dirname, '_/dots.html'),
                frag: resolve(__dirname, '_/frag.html')
            }
        }
    }
})