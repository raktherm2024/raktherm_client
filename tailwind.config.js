/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        screen: "url(./src/assets/img/product.png)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
