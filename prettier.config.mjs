/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 has no JS config file; the plugin reads the theme from the CSS
  // entry point. Resolved relative to this file.
  tailwindStylesheet: "./src/app/globals.css",
  endOfLine: "auto",
};

export default config;
