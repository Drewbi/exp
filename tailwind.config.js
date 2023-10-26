import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'white': '#fff',
            'grey': '#282828'
        },
        fontFamily: {
            'text': ['Red Hat Text', ...defaultTheme.fontFamily.sans],
            'display': ['Red Hat Display', ...defaultTheme.fontFamily.sans],
            'mono': ['Red Hat Mono', ...defaultTheme.fontFamily.mono],
        }
    },
    plugins: [],
}

