import tnaEslintConfig from "@nationalarchives/eslint-config";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...tnaEslintConfig,
  globalIgnores([
    "templates/static/scripts/**/*",
    "**/*.map.js",
    "templates/static/scripts/search_results_map.js",
  ]),
]);
