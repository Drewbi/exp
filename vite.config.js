import { resolve } from 'path';
import { defineConfig } from 'vite'
import mpa from 'vite-plugin-mpa';
import glsl from 'vite-plugin-glsl';

console.log(process.env.NODE_ENV)
export default defineConfig({
    base: process.env.base_url ?? '/',
    plugins: [
        mpa({
            scanDir: 'src/exp',
        }),
        glsl()
    ],
})