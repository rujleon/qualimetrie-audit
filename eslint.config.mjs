import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,  // ← Ajoute Jest globals
      },
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "complexity": ["error", 10],
      "no-unused-vars": "warn",
      "no-undef": "off",  // ← Désactive no-undef (géré par globals)
    },
  },
  {
    files: ["**/*.test.js"],  // ← Règles spécifiques pour les tests
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    rules: {
      "no-undef": "off",
    },
  },
];