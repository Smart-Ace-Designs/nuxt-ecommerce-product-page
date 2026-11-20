import type { Config } from "prettier";
import type { PluginOptions } from "prettier-plugin-tailwindcss";

const config: Config & PluginOptions = {
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindAttributes: ["active-class", "inactive-class", "ui"],
  tailwindFunctions: ["clsx", "cn", "cva", "tv"],
  tailwindStylesheet: "app/assets/css/main.css",
};

export default config;
