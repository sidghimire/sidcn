/** @type {import('tailwindcss').Config} */
    module.exports = {
      // NOTE: Update this to include the paths to all of your component files.
      content: ["./components/sidcn/**/*.{js,jsx,ts,tsx}","./App.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}"],
      presets: [require("nativewind/preset")],
      theme: {
        extend: {},
      },
      plugins: [],
    }