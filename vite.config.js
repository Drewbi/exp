import { defineConfig } from 'vite'
import mpa from 'vite-plugin-mpa';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    base: process.env.base_url ?? '/',
    plugins: [
        mpa({
            open: '/src/exp/index.html',
            scanDir: 'src/exp',
        }),
        glsl()
    ],
})