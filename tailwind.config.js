/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
    // Make sure Tailwind scans all our templates for class usage
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    // Register DaisyUI via ESM import to avoid require() issues in ESM projects
    plugins: [daisyui],
    // Use built-in Cupcake theme (no custom import path needed)
    daisyui: {
        themes: ["cupcake"],
    },
};
