import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsdoc from "eslint-plugin-tsdoc";

export default defineConfig([...nextVitals, ...nextTs, {
  plugins: {
    tsdoc,
  },
  rules: {
    "tsdoc/syntax": "warn",
  },
}, globalIgnores([
  ".next/**",
  "out/**",
  "build/**",
  "next-env.d.ts",
]), ...storybook.configs["flat/recommended"]]);
