
import { defineConfig, globalIgnores } from "eslint/config";
import tnaEslintConfig from "@nationalarchives/eslint-config";

export default defineConfig([...tnaEslintConfig,
  globalIgnores([
    "**/*.map.js",
    "templates/static/scripts/search_results_map.js"
  ]),]);