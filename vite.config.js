import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/exp/',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                boi: resolve(__dirname, '_/boi.html')
            }
        }
    }
})