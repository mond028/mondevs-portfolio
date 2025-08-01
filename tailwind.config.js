module.exports = {
    content: [
        "./index.html",
        "./assets/js/main.js"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'fadeIn': 'fadeIn 1s ease-in-out forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            colors: {
                'primary': {
                    '50': '#f0f9ff',
                    '100': '#e0f2fe',
                    '200': '#bae6fd',
                    '300': '#7dd3fc',
                    '400': '#38bdf8',
                    '500': '#0ea5e9',
                    '600': '#0284c7',
                    '700': '#0369a1',
                    '800': '#075985',
                    '900': '#0c4a6e',
                }
            }
        },
    },
    plugins: [],
}