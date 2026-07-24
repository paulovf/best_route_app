import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tsdoc from "eslint-plugin-tsdoc";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tsdoc,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    rules: {
      "tsdoc/syntax": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-cycle": "error",
      "import/first": "error",
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/features/city-search",
              from: "./src/features/routing",
              message:
                "Módulos de city-search não podem importar de routing. Mantenha as features isoladas!",
            },
            {
              target: "./src/features/routing",
              from: "./src/features/city-search",
              message:
                "Módulos de routing não podem importar de city-search. Mantenha as features isoladas!",
            },
            {
              target: "./src/components",
              from: "./src/features",
              message:
                "Componentes de UI devem ser 'burros'. Não importe regras de negócio para dentro da UI global.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...storybook.configs["flat/recommended"],
]);
