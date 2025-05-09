/** @type {import('tailwindcss').Config} */
export default{
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("flowbite/plugin"), require("tailwind-scrollbar"), require('@tailwindcss/line-clamp'), require('@tailwindcss/aspect-ratio')],
}